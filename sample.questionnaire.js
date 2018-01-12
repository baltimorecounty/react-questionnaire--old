var bcQuestionnaire = {
	Messages: [
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
		},
		{
			id: 3,
			text: "Thanks for taking the time to help us out! Come back soon. :smile:",
		}
	]
};