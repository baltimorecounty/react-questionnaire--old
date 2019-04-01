var bcQuestionnaire = {
	Messages: [
		{
			id: 1,
			text: "Are you having any problem's creating the sample questionnaire?",
			key: "hadProblemWithSample",
			fieldType: "radio",
			options: {
				"true": {
					text: "Yes",
					nextStep: 2
				},
				"false": {
					text: "No",
					nextStep: 3
				}
			}
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
			text: "Thanks for taking the time to help us out! Come back soon. :)",
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
				var quittingTime = 17;
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