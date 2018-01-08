export default [
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
    { // Non resident
        id: 10,
        text: "<div id=\"spayNeuterFormResults\" class=\"bc-form-control alert-warning\" aria-hidden=\"false\" role=\"alert\"><p>We're sorry. Only County residents are eligible for discount spay or neuter procedures.</p></div>",
	},
	{ // Free Any facility
        id: 11,
        text: "<div id=\"spayNeuterFormResults\" class=\"bc-form-control alert-success\" aria-hidden=\"false\" role=\"alert\"><p>Good news! You're eligible for a <strong>free procedure</strong> at any of our facilities. Select a location to book your appointment.</p><ul><li><a href=\"https://clinichq.com/online/564cf872-6f61-476f-8ecd-61d574a8a06f\">Baldwin, 13800 Manor Road</a></li><li><a href=\"https://clinichq.com/online/144afb8f-6c15-4f15-8e16-9417a4f85823\">Dundalk, 7702 Dunmanway</a></li><li><a href=\"https://clinichq.com/online/3edba5a4-9922-4e2a-87a5-c138c8e8f4a8\">Southwest Area Park, 3941 Klunk Drive</a></li></ul></div>"
	},
	{ // Free, Dundalk
		id: 12,
		text: "<div id=\"spayNeuterFormResults\" class=\"bc-form-control alert-success\" style=\"\" aria-hidden=\"false\" role=\"alert\"><p>Good news! You're eligible for a <strong>free procedure</strong> at our Dundalk facility at  7702 Dunmanway.</p><ul><li><a href=\"https://clinichq.com/online/144afb8f-6c15-4f15-8e16-9417a4f85823\">Book Now at Dundalk</a></li></ul></div>"
	},
	{ // Free, SWAP Center
		id: 13,
		text: "<div id=\"spayNeuterFormResults\" class=\"bc-form-control alert-success\" style=\"\" aria-hidden=\"false\" role=\"alert\"><p>Good news! You're eligible for a <strong>free procedure</strong> at our Southwest Area Park facility at 3941 Klunk Drive.</p><ul><li><a href=\"https://clinichq.com/online/3edba5a4-9922-4e2a-87a5-c138c8e8f4a8\">Book Now at Southwest Area Park</a></li></ul></div>"
	},
	{ // Standard
		id: 14,
		text: "<div id=\"spayNeuterFormResults\" class=\"bc-form-control alert-success\" style=\"display: block;\" aria-hidden=\"false\" role=\"alert\"><p>Good news! You're eligible for a <strong>$20 procedure</strong> at any of our facilities. Select a location to book your appointment. Make sure to continue to the payment screen after you book.</p><ul><li><a href=\"https://clinichq.com/online/564cf872-6f61-476f-8ecd-61d574a8a06f\">Baldwin, 13800 Manor Road</a></li><li><a href=\"https://clinichq.com/online/144afb8f-6c15-4f15-8e16-9417a4f85823\">Dundalk, 7702 Dunmanway</a></li><li><a href=\"https://clinichq.com/online/3edba5a4-9922-4e2a-87a5-c138c8e8f4a8\">Southwest Area Park, 3941 Klunk Drive</a></li></ul></div>"
	}
];