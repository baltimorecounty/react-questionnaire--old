# Step by Step Guide to Creating a Questionnaire

This guide will help you learn how to create a new questionnaire from scratch. 

In this example, we will build a questionnaire that will evaluate this guide. (I know very meta ,right?)

Our requirements are

- Ask the user if they had any problems creating this sample questionnaire. Possible answers are "Yes" and "No"
- If the user answers "Yes", we then want to ask them another question, if they answer "No", we want to display a message "Glad we could help :smile:"
- The user found a problem with this guide, we then want to ask them which step was hard 1, 2, 3 (these are arbitray)
- If the user answers 1 or 2, we want to show the user a message "We will take note of that and look to fix our guide", if the user answers 3 we want to ask another question
- The user has answered 3, we want ask another question, "What method of communication do you prefer?" with the possible answers "Phone" or "Email"
- If the user answers phone to the previous question, we want to check what time of day it is, If it's after business hours then we want to let the user know we will call them tomorrow, otherwise we want to let the m know we will call them shortly. If the user answers email to the previous question, we will simply send them a message that suggests and email to get in touch is on it's way.


## Step 1 - Create a new Data File

Follow the following fomrat {describe-the-questionniare}.questionnaire.js

## Step 2 - Setup the file structure.

You will need to add the following lines to your empty file.

```javascript
var bcQuestionnaire = {
  Messages: []
};
```

# Step 3 - Add your first question

Our questionnaire always starts with a question. For a quick reminder our first question is "Did you have any problem's creating the sample questionnaire?" with possible values of *true* and *false*. If the user answers yes, they will go to a new question, otherwise they will get a message.

Our question will look like this:

```javascript
{
	id: 1,
	text: "Did you have any problem's creating the sample questionnaire",
	key: "hadProblemWithSample",
	fieldType: "radio",
	options: {
		true: {
			text: "Yes",
			nextStep: 2
		},
		false: {
			text: "No",
			nextStep: 3
		}
	}
}
```

If the user answers "Yes", we will go to step 2, and no to step 3. We will need to create these before the app can work. We will do this below. 

See what our data file looks like here.

# Step 4 - Add 
