export default {
	"fullName": {
		test: function(name) {
			return /^[a-zA-Z ]+$/.test(name);
		},
		message: "Please specify your first and last name separated by a space. Ex. \"Dan Fox\""
	},
	"address": {
		test: function(address) {
			return /^[a-zA-Z0-9\s,'-]*$/.test(address);
		},
		message: "Please specify your address. Ex. \"400 Washington Ave Towson, MD 21204\""
	},
	"email": {
		test: function(email) {
			return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
		},
		message: "Please specify a valid email address. Ex. \"bot@baltimorecountymd.gov\""
	},
	"zipCode": {
		test: function(zipCode) {
			return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
		},
		message: "Please specify a valid zipcode. Ex. \"21204\""
	}
};