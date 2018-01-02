import React, { Component } from 'react';
import '../styles/message.css';
import '../styles/question.css';

class QuestionMessageComponent extends Component {
    render() {
        return (
            <div className="message message--question">
                <div className="text" dangerouslySetInnerHTML={{__html: this.props.message.text}} />
            </div>
        );
    }
}

export default QuestionMessageComponent;