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
			text: "Thanks for taking the time to help us out! Come back soon. :smile:",
		}
	]
};