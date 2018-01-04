const Utilities = require('../core/utils').default;
let utils;

const mockState = {
	messages: [{
		id: 1,
		message: "Message 1"
	},
	{
		id: 2,
		message: "Message 2"
	}]
};

beforeEach(() => {
    utils = new Utilities();
});

test('utilities exists', () => {
	expect(utils).toBeDefined();
});
describe('get state item by id', () => {
	test('should return an empty array if the id is not found', () => {
		const actual = utils.getArrItemById(mockState.messages, 4);
		expect(actual).toEqual(null);
	});
	test('should return an a single object if the id is found, matching that id', () => {
		const actual = utils.getArrItemById(mockState.messages, 2);
		const expected = {
			id: 2,
			message: "Message 2"
		};
		expect(actual).toEqual(expected);
	});
	test('should return an null if target arr doesn\'t exist', () => {
		const actual = utils.getArrItemById(mockState.logs, 1);
		expect(actual).toEqual(null);
	});
});

