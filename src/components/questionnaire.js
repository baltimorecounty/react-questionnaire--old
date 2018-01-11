import React, { Component } from 'react';
import '../styles/conversation.css';
import Question from '../components/question';
import Utilities from '../core/utils';
import ValidationRules from '../core/ci-validation';

class QuestionnaireComponent extends Component {
    constructor(props) {
		super(props);
		
		this.utils = new Utilities();
		this.state = this.getInitialState();

		this.handleButtonSelect = this.handleButtonSelect.bind(this);
		this.handleTextInputChange = this.handleTextInputChange.bind(this);
		this.restartQuestionnaire = this.restartQuestionnaire.bind(this);
	};

	componentWillMount() {
        this.startQuestionnaire();
	};
	
	getInitialState() {
		this.resetMessages();

        return {
            activeMessage: {},
			answers: {},
			validationErrors: [],
            log: [],
			isLoading: false,
			isFinished: false,
			messages: this.props.messages,
			
        };
	};
	
	addToLog(item) {
		let log = this.state.log;
		log.push(item);
		this.setState({
			log: log
		});
	};

	getLogById(id) {
		return this.utils.getArrItemById(this.state.log, id);
	};

	getMessageById(id) {
		if (!id) {
			return this.state.messages[0];
		}
		return this.utils.getArrItemById(this.state.messages, id);
	};

	getNextMessage(nextStep, callback) {
		// Get the next message
		const nextMessage = this.getMessageById(nextStep);

		// Push the question to the log
		this.addToLog(nextMessage);

		const isLastMessage = !Object.hasOwnProperty.call(nextMessage, 'options');
		if (isLastMessage) {
			this.setState({
				isFinished: true,
			})
		}
	};

	getValidationErrors(validationTypes, input, key) {
        let validationErrors = [];

        for (let validationType of validationTypes) {
            var validationObj = ValidationRules[validationType];

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

	handleButtonSelect(questionId, answerValue, answerInfo) {
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
		this.setLogQuestionToAnswered(questionId, answerInfo.text);

		// Add the answer to the answer list
		this.setAnswer(activeQuestion.key, answerValue);

		// Go to the next question, if it exists
		this.getNextMessage(answerInfo.nextStep);
	};
	
	handleTextInputChange(questionKey, validationTypes, changeEvent) {
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

	resetMessages() {
		this.props.messages.forEach((message) => {
			message.answer = null;
			message.isAnswered = false;
		});
	}

    restartQuestionnaire() {
        var initialState = this.getInitialState();
        this.setState(initialState, () => {
            this.startQuestionnaire();
        });
	};

	setAnswer(key, answer) {
		let answers = this.state.answers;
		answers[key] = answer;

		this.setState({
			answers: answers
		})
	}

	setLogQuestionToAnswered(id, answer) {
		const messageLog = this.state.log;
		let logItemToUpdateIndex;
		let logItemToUpdate;

		for (let i = 0, len = messageLog.length; i < len; i++) {
			const logItem = messageLog[i];
			const idMatches = logItem.id === id;

			if (idMatches) {
				logItemToUpdate = logItem;
				logItemToUpdateIndex = i;
				break;
			}
		}

		logItemToUpdate.isAnswered = true;
		logItemToUpdate.answer = answer;
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
										onHandleTextInputChange={this.handleTextInputChange} />
						})}
                    </section>
					{this.state.isFinished &&
						<a className="btn-link"
							onClick={this.restartQuestionnaire}>Start Over?</a>
					}
                </section>
            </div>
        );
    }
}

export default QuestionnaireComponent;