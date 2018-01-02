import React, { Component } from 'react';
import '../styles/answer.css';

class AnswerComponent extends Component {
    render() {
        return (
            <p className="answer" dangerouslySetInnerHTML={{__html: this.props.message.text}}></p>
        );
    }
}

export default AnswerComponent;