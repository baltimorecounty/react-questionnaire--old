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
		}
	]
};