var Messages = [
    {
        id: 2,
        text: "Are you a Baltimore County Resident?",
        sender: "question",
        key: "isResident",
		fieldType: "radio",
        options: {
			"true": {
				text: 'Yes',
				nextStep: 4
			},
			"false": {
				text: 'No',
				nextStep: 10
			}
		}
	},
    {
        id: 4,
        text: "What type of pet do you have?",
		sender: "question",
		key: "petType",
        fieldType: "radio",
        options: {
			"cat": {
				text: 'Cat',
				nextStep: 6
			},
			"pitbull": {
				text: "Pit Bull",
				nextStep: 6
			},
			"other": {
				text: 'Another Type of Dog',
				nextStep: 8
			}
		}
	},
	{
        id: 6,
        text: "Do you receive public assistance?",
		sender: "question",
		key: "receivesPublicAssistance",
        fieldType: "radio",
        options: {
			"true": {
				text: 'Yes',
				nextStep: 11
			},
			"false": {
				text: 'No',
				nextStep: 8
			}
		}
	},
	{
		id: 8,
        text: "What is your zip code?",
        sender: "bot",
        key: "zipCode",
        fieldType: "text",
		validationTypes: ['zipCode'],
		options: (answers) => {
			//Return the next step
			const zip = answers.zipCode ? parseInt(answers.zipCode) : null;
			const dundalkCenterZips = [21222, 21219, 21220, 21221, 21224, 21237];
			const zipIsInDundalkZips = dundalkCenterZips.indexOf(zip) > -1;

			if (zipIsInDundalkZips) {
				return 12;
			}

			const swapCenterZips = [21227, 21228, 21244, 21207];
			const isCat = answers.petType ? answers.petType.toLowerCase().indexOf('cat') > -1 : false;
			const zipIsInSwapZips = swapCenterZips.indexOf(zip) > -1;

			if (isCat && zipIsInSwapZips) {
				return 13;
			}
			return 14;
		}
	},
    {
        id: 10,
        text: "Sorry you do not qualify for a procedure, Have a nice day :)",
		sender: "bot"
	},
	{
        id: 11,
        text: "Well, I have some great news, you qualify for a free procedure at any of our locations.",
		sender: "bot",
		isLastMessage: true
	},
	{
		id: 12,
		text: "Congrats you are qualified for a free procedure for your ${petType} at one of our Dundalk Centers. <a href='https://clinichq.com/online/144afb8f-6c15-4f15-8e16-9417a4f85823'>Register</a> now"
	},
	{
		id: 13,
		text: "Congrats you are qualified for a free procedure for your ${petType} at one of our SWAP Centers."
	},
	{
		id: 14,
		text: "Congrats you are qualified for a $20 procedure at any of our locations."
	}
];

export default Messages;