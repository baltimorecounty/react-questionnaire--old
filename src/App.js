import React, { Component } from 'react';
import './App.css';
import Questionnaire from './components//questionnaire'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Questionnaire 
          messages={window.bcQuestionnaire.Messages} />
      </div>
    );
  }
}
export default App;
