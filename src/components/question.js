import React, { Component } from 'react';
import '../styles/message.css';
import QuestionMessage from './question-message';
import Answer from '../components/answer';
import RadioInput from '../components/answers-radio-inputs';
import TextInput from '../components/answer-text-input';

function Question(message, props) {
		const optionKeys = message.options ? Object.keys(message.options) : [];
		const isRadioInput = message && message.hasOwnProperty('fieldType') 
			&& message.fieldType === 'radio' && optionKeys.length > 0;
		
        if (isRadioInput) {
            return (
                <div>
                    <QuestionMessage message={message} />
					<RadioInput 
						message={message}
						optionKeys={optionKeys} 
						handlers={props} />
                </div>
            )
		}
		else if (message.fieldType === 'text') {
			return (
				<div>
					<QuestionMessage message={message} />
					<TextInput
						message={message}
						handlers={props}
						validationErrors={props.validationErrors} />
				</div>
			)
		}
		return <Answer message={message} />;
}

class QuestionComponent extends Component {
    render() {
        return (
            Question(this.props.message, this.props)
        );
    }
}

export default QuestionComponent;