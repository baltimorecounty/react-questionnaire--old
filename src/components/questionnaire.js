import React, { Component } from 'react';
import '../styles/conversation.css';
import Question from '../components/question';
import Validator from '../core/ci-validation';

const generateTemplateString = (function(){
    var cache = {};
    function generateTemplate(template){
    var fn = cache[template];
    if (!fn){
    // Replace ${expressions} (etc) with ${map.expressions}.
    var sanitized = template
        .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function(_, match){
            return `\$\{map.${match.trim()}\}`;
            })
        // Afterwards, replace anything that's not ${map.expressions}' (etc) with a blank string.
        .replace(/(\$\{(?!map\.)[^}]+\})/g, '');
    fn = Function('map', `return \`${sanitized}\``);
    }
    return fn;
};
return generateTemplate;
})();

class QuestionnaireComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = this.getInitialState();
        this.state.messages = this.props.messages;
	};

	componentWillMount() {
        this.startQuestionnaire();
    };

	getInitialState = () => {
        return {
            activeMessage: {},
			answers: {},
			validationErrors: [],
            log: [],
			isLoading: false,
			messages: this.props.messages
        };
	};
	
	addToLog = (item) => {
		let log = this.state.log;
		log.push(item);
		this.setState({
			log: log
		});
	};

	getLogById = (id) => {
		return this.state.log.filter(item => Object.hasOwnProperty.call(item, 'id') ? item.id === id : false)[0];
	};

	getMessageById = (id) => {
		if (!id) {
			return this.state.messages[0];
		}
		return this.state.messages.filter(message => message.id === id)[0];
	};

	getNextMessage = (nextStep, callback) => {
		// Get the next message
		const nextMessage = this.getMessageById(nextStep);

		// Allow for users to use answer data in their quetions and answers
		nextMessage.text = this.parseTemplate(nextMessage.text, this.state.answers);

		// Push the question to the log
		this.addToLog(nextMessage);
	};

	getValidationErrors = (validationTypes, input, key) => {
        let validationErrors = [];
        const validator = new Validator();

        for (let validationType of validationTypes) {
            var validationObj = validator.Rules[validationType];

            if (!validationObj.test(input)) {
                validationErrors.push({
                    type: validationType,
                    input: input,
                    message: validationObj.message
                })
            }
		}

		var newErrors = this.state.validationErrors;
		newErrors = newErrors.concat(validationErrors);

		if (validationErrors.length) {
			this.setState({
				validationErrors: newErrors
			})
		}
		else {
			this.setState({
				validationErrors: []
			});
		}	
		return validationErrors;
	};

	handleButtonSelect = (questionId, answerValue, answerInfo) => {
		let activeQuestion = this.getMessageById(questionId);

		if (!answerInfo) {
			answerInfo = {};

			// The answer must already be in the state
			const answerObjExists = Object.hasOwnProperty.call(this.state.answers, answerValue);
			const answer = answerObjExists && !!this.state.answers[answerValue] 
				? this.state.answers[answerValue] : null;

			if (!answerObjExists || !answer) {
				return;
			}

			// Set the step = to the value in the state
			answerInfo.text = answer;

			//What is the next Step
			// A custom method or the options should figure out what this is
			var isMethod = typeof activeQuestion.options === 'function';

			if (isMethod) {
				answerInfo.nextStep = activeQuestion.options(this.state.answers);
			}
		}

		// Set the active question to answered
		this.setLogQuestionToAnswered(questionId);

		// Push the answer to the question log
		this.addToLog({
			text: answerInfo.text,
			type: 'answer'
		});

		// Add the answer to the answer list
		this.setAnswer(activeQuestion.key, answerValue);

		// Go to the next question, if it exists
		this.getNextMessage(answerInfo.nextStep);
	};

	handleFormSubmit = (e) => {
		console.log(e);

	};
	
	handleTextInputChange = (questionKey, validationTypes, changeEvent) => {
		const answers = this.state.answers;
		const zipStr = changeEvent.target.value;
		const validationErrors = this.getValidationErrors(validationTypes, zipStr, questionKey);

		if (validationErrors.length === 0) {
			answers[questionKey] = zipStr;
		}
		else {
			answers[questionKey] = null;
		}

		this.setState({
			answers: answers
		});
	};

    parseTemplate = (messageText, data) => {
        let template = generateTemplateString(messageText);
        return template(data);
    };

    restartQuestionnaire = () => {
        var initialState = this.getInitialState();
        this.setState(initialState, () => {
            this.startQuestionnaire();
        });
	};

	setAnswer = (key, answer) => {
		let answers = this.state.answers;
		answers[key] = answer;

		this.setState({
			answers: answers
		})
	}

	setLogQuestionToAnswered = (id) => {
		const messageLog = this.state.log;
		let logItemToUpdateIndex;
		let logItemToUpdate;

		for (let i = 0, len = messageLog.length; i < len; i++) {
			const logItem = Object.assign({}, messageLog[i]);
			const idExists = Object.hasOwnProperty.call(logItem, 'id');
			const idMatches = logItem.id === id;

			if (idExists && idMatches) {
				logItemToUpdate = logItem;
				logItemToUpdateIndex = i;
				break;
			}
		}

		logItemToUpdate.isAnswered = true;
		messageLog[logItemToUpdateIndex] = logItemToUpdate;

		this.setState({
			log: messageLog
		});
	};
	
    startQuestionnaire() {
        this.getNextMessage();
	};
	
    render() {
        const { userInput, disableUserInput } = this.state;

        return (
            <div className="conversation-container">
                <section id="conversation" className="conversation">
                    <section className="conversation-body">
                        {this.state.isLoading &&
                            <p>Loading</p>
                        }
                        {this.state.log.map((message, index) => {
                            return <Question 
										key={index}
										validationErrors={this.state.validationErrors}
										message={message}
										onButtonSelect={this.handleButtonSelect}
										onQuestionSubmit={this.handleFormSubmit}
										onHandleTextInputChange={this.handleTextInputChange} />
						})}
                    </section>
                </section>
            </div>
        );
    }
}

export default QuestionnaireComponent;