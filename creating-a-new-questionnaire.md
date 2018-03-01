# Step by Step Guide to Creating a Questionnaire

This guide will help you learn how to create a new questionnaire from scratch. 

In this example, we will build a questionnaire that will evaluate this guide. (I know very meta, right?)

Our requirements are

- Ask the user if they had any problems creating this sample questionnaire. Possible answers are "Yes" and "No"
- If the user answers "Yes", we then want to ask them another question, if they answer "No", we want to display a message "Thanks for taking the time to help us out! Come back soon. :smile:"
- The user found a problem with this guide, we then want to ask them which step was hard 1, 2, 3 (these are arbitray)
- If the user answers 1 or 2, we want to same message we did when the user answers the first question as "No", if the user answers 3 we want to ask another question
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

## Step 3 - Add your first question

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

## Step 4 - Adding Next Steps

Let's handle our option next Steps.

### The User has NO problems with the guide

In this step we simply want to thank the user for taking the questionnaire and end it. If we look options for question 1, we see that the next step has an id of 3. That id, doesn't exist, so lets create it!

```javascript
var bcQuestionnaire = {
  Messages: [
	  {
		  id: 1,
		  ...
	  },
	  {
		  id: 3,
		  text: "Thanks for taking the time to help us out! Come back soon. :smile:",
	  }
  ]
};
```

### So the user had some issues with this guide

Ok, we need to ask the user another question, this is still pretty straight forward, but let's go ahead and add another question.

```javascript
var bcQuestionnaire = {
  Messages: [
	{
		id: 1,
		...
	},
	{
		id: 2,
		text: "Did you have any problem's creating the sample questionnaire",
		key: "hadProblemWithSample",
		fieldType: "radio",
		options: {
			"step1": {
				text: "Step 1",
				nextStep: 3
			},
			"step2": {
				text: "Step 2",
				nextStep: 3
			},
			"step3": {
				text: "Step 3",
				nextStep: 4
			}
		}
	},
	{
		id: 3,
		...
	}
  ]
};
```

Well now see in our options that both Step 1 and Step 2, will show are already created message. And Step 3 will result in use having to create another question.

Note: I usually setup my id's in order of how questions and message will be shown, but as long at they are unique they should work.

## Step 4 - Adding Question with Next Steps that aren't so straight forward

In our next step, we want to determine the next step based on our answers and the time of day. We will need to pass property to our object to decide what the next step is based on our answers and some date javascript.

```javascript
var bcQuestionnaire = {
  Messages: [
	{
		id: 1,
		...
	},
	{
		id: 2,
		...
	},
	{
		id: 3,
		...
	},
	{
		id: 4,
		text: "What method of communication do you prefer?",
		key: "preferredCommunicationMethod",
		fieldType: "radio",
		options: {
			"phone": {
				text: "Phone"
			},
			"email": {
				text: "E-mail"
			}
		},
		nextStep: function(answers) {
			var currentHour = new Date().getHours();
			var isAfterWorkHours = currentHour >= 17;
			var isBeforeWorkHours = currentHour <= 9;
			var isEmailPreferred = answers.preferredCommunicationMethod.toLowerCase() === 'email';

			if (isEmailPreferred) {
				return 5;
			}

			// Phone is the prefered method
			if (isBeforeWorkHours || isAfterWorkHours) {
				return 6;
			}
			return 7;
		}
	},
	{
		id: 5,
		text: "Thanks for helping us out soon, you should receive an email from us shortly."
	},
	{
		id: 6,
		text: "Thanks for helping us out soon, we will give you a ring tomorrow during business hours"
	},
	{
		id: 7,
		text: "Thanks for helping us out soon, we will give you a ring shortly."
	}
  ]
};
```

We went ahead and added the required messages for the computed next steps.

### Step 5 - Run and Test Your Questionnaire

The easiest way to run this app is create or use an exisiting web page.

Add the following to it where you want the app to display: 

```html
<div id="root"></div><!-- questionnaire will be generated inside this div -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"></script> <!-- this polyfill lets our app work in more browsers -->
<script src="/the/path/to/my/datafile.js"></script>
<script src="/the/path/to/the/questionaire-component.js"></script>
```

Make sure the questions work as you setup, if not modify them as needed.