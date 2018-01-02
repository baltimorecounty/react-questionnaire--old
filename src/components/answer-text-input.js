import React, { Component } from 'react';

class TextInputAnswerComponent extends Component {
    render() {
		const { message, handlers, validationErrors } = this.props;
        return (
			<div className="message--question form">
				<div key={message.key} className="form-field">
					<form onSubmit={(e) => handlers.onQuestionSubmit(e)}>
						<input 
							type='text' 	 
							id={message.key}
							onChange={(e) => handlers.onHandleTextInputChange(message.key, message.validationTypes, e)} />
						<button 
							className="btn"
							type="submit"
							disabled={validationErrors.length}
							onClick={() => handlers.onButtonSelect(message.id, message.key)}>Check Status</button>
					</form>
				</div>
			</div>
        );
    }
}

export default TextInputAnswerComponent;