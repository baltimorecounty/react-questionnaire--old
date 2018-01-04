import React, { Component } from 'react';

class TextInputAnswerComponent extends Component {
	constructor(props) {
		super(props);

		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			inputValue: ''
		};
	};

	setInputValue(onInputChangeEvent) {
		const { message } = this.props;

		this.setState({
			inputValue: onInputChangeEvent.target.value
		});

		this.props.handlers
			.onHandleTextInputChange(message.key, message.validationTypes, onInputChangeEvent);
	}

	onQuestionSubmit(submitEvent) {
		submitEvent.preventDefault();
	}
	
    render() {
		const { message, handlers, validationErrors } = this.props;
		
        return (
			<div className="message--question form">
				<div key={message.key} className="form-field">
					<form onSubmit={this.onQuestionSubmit}>
						<input 
							type='text' 	 
							id={message.key}
							disabled={message.isAnswered}
							value={message.isAnswered && message.answer}
							onChange={(e) => this.setInputValue(e) } />
						{!message.isAnswered &&
							<button 
								className="btn contentButton"
								type="submit"
								disabled={!this.state.inputValue || validationErrors.length}
								onClick={() => handlers.onButtonSelect(message.id, message.key)}>Check Eligibility</button>
						}
					</form>
				</div>
			</div>
        );
    }
}

export default TextInputAnswerComponent;