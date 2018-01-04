import React, { Component } from 'react';

class RadioInputAnswerComponent extends Component {
    render() {
		const { message, handlers, optionKeys } = this.props;
        return (
			<div className="message--question form">
				{optionKeys.map((key, index) =>
					<div key={key} className="form-field">
						<input 
							type='radio' 
							onClick={() => handlers.onButtonSelect(message.id, key, message.options[key])}
							disabled={message.isAnswered}
							checked={message.isAnswered && message.answer === message.options[key].text}
							id={message.options[key].text} 
							value={message.options[key].text} />
						<label 
							htmlFor={message.options[key].text}>{message.options[key].text}</label>
					</div>
				)}
			</div>
        );
    }
}

export default RadioInputAnswerComponent;