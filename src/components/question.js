import React, { Component } from 'react';
import '../styles/message.css';
import QuestionMessage from './question-message';
import Answer from '../components/answer';

function Question(message, props) {
		const optionKeys = message.options ? Object.keys(message.options) : [];
		const isRadioInput = message && message.hasOwnProperty('fieldType') 
			&& message.fieldType === 'radio' && optionKeys.length > 0;
		const hasErrors = props.validationErrors.length > 0;
		
        if (isRadioInput) {
            return (
                <div>
                    <QuestionMessage message={message} />
                    {!message.isAnswered && message.fieldType === 'radio' &&
                        <div className="message--question form">
							{optionKeys.map((key, index) =>
								<div key={key} className="form-field">
									<input 
										type='radio' 
										onClick={() => props.onButtonSelect(message.id, key, message.options[key])} 
										id={message.options[key].text} 
										value={message.options[key].text} />
									<label 
										htmlFor={message.options[key].text}>{message.options[key].text}</label>
								</div>
                            )}
                        </div>
					}
                </div>
            )
		}
		else if (message.fieldType === 'text') {
			return (
				<div>
					<QuestionMessage message={message} />
					{!message.isAnswered && message.fieldType === 'text' &&
                        <div className="message--question form">
							<div key={message.key} className="form-field">
								<input 
									type='text' 	 
									id={message.key}
									onChange={(e) => props.onHandleTextInputChange(message.key, message.validationTypes, e)} />
								<button 
									className="btn" 
									disabled={props.validationErrors.length}
									onClick={() => props.onButtonSelect(message.id, message.key)}>Check Status</button>
							</div>
                        </div>
                    }
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