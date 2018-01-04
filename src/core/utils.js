class Utilities {
	filterObjectArray(item, id) {
		return Object.hasOwnProperty.call(item, 'id') ? item.id === id : false;
	};

	getArrItemById(targetArr, id) {
		if (!targetArr || !targetArr.length) {
			return null;
		}
		const objects = targetArr
			.filter((item) => this.filterObjectArray(item, id));

		return objects.length ? objects[0] : null;
	}
}

export default Utilities;