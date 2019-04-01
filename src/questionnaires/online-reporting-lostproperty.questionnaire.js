var Messages = [
    {
        id: 1,
        text: 'Does the lost property include a license plate or firearm?',
        sender: 'question',
        key: 'isPlateOrFireArm',
        fieldType: 'radio',
        options: {
            true: {
                text: 'Yes',
                nextStep: 5
            },
            false: {
                text: 'No',
                nextStep: 2
            }
        }
    },
    {
        id: 2,
        text: 'Did the property have a serial number that you have available to provide?',
        sender: 'question',
        key: 'hasSerialNumber',
        fieldType: 'radio',
        options: {
            true: {
                text: 'Yes',
                nextStep: 5
            },
            false: {
                text: 'No',
                nextStep: 3
            }
        }
    },
    {
        id: 3,
        text: 'Does the lost property have a total value of $15,000 or greater?',
        sender: 'question',
        key: 'valueGreaterThan15000',
        fieldType: 'radio',
        options: {
            true: {
                text: 'Yes',
                nextStep: 5
            },
            false: {
                text: 'No',
                nextStep: 4
            }
        }
    },
    {
        id: 4,
        text: '<p>Your report is qualified to file online.</p>&nbsp;<a href=\'http://www.baltimorecountymd.gov/Redirect/externalwebsites/Coplogic/lostpropertyredirect.html\' class=\'startReport\'>File a Report Now</a>'
    },
    {
        id: 5,
        text: 'Sorry, your report does not qualify to file online. You need to  file by calling the non-emergency number at 410-887-2222 or visiting your <a href=\'http://www.baltimorecountymd.gov/Agencies/police/precinctsall.html\'>local precinct.</a>'
    }
];

export default Messages;
