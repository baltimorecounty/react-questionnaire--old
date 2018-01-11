# React Questionnaire

This component allows the user to choose their "Own Adventure" based on information and sending them to a desired County Site or Service.

## Usage
Follow this section to setup your adventure in no time.

1. Create a new javascript file, be sure to give it a meaningful name. ```ex: spay-neuter.questions.js```
1. To start the questionaire you must start with the following code
```javascript
var bcQuestionnaire = {
  Messages: []
};
```
1. You will now add message objects in between ```[]```

### Messages
There are two types of messages, ```question``` and ```normal```

Each message must contain the following information.
- id - unique identifier for the Question, each message must have a unique id
- text - text will be the message you want to display to the user, this may be a question, message, or html 

### Question
A question is pretty straight forward, but additional information.
- key - this must be unique value, and identify the data that you want answer. ```example: 
- fieldType -  right now this can only be ```radio``` or ```text```. However, although text would work, it is tightly tied to the spay/neuter questions and needs to be [updated](#1) to be more flexible (as of 1/11/2018).
- options - provides the friendly values we want the user to see, the value we want to use in our code, and the next message to display. Options can either be a javascript object or a function that returns the next step. 

#### Options as an Object
In the below example values could be based on the question `Do you have a cat?`. The answer would be clearly yes (true) or no (false). The text property is the value that we want to display to the user in the label associated with the radio button. Finally, the ```nextStep``` property is always an integer will be the id of the next message you would like the user to be shown. This message can be a question, or a message.

```javascript
options: {
	true: {
		text: "Yes",
		nextStep: 4
	},
	false: {
		text: "No",
		nextStep: 10
	}
}
```

#### Options as a Function

When you use the options as a function it will look something like this:

```javascript
options: function(answers) {
	if (answers.isMartyAwesome)  {
		return 6; // lets the app know the next step Message with an Id of 6
	}
	return 7; // lets the app know the next step Message with an Id of 7
}
```



### Plain Old Message

If a message only contains an id, and a text property than this will a plain message. Typically the only place you will use these are at the end of a questionnaire. Important to emphasize, the text in these message can be html, so that you can display other things than just text, like links and buttons.




## Maintenance

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). If you want to learn more about it, go [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
