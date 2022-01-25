const parseSearchString = (searchString) => {
	if (!searchString || searchString == 'none' || searchString == 'None') {
		return {};
	}

	const parameters = searchString.split(',');
	let searchObj = {};
	for (const parameter of parameters) {
		//console.log(parameter);
		const [key, modifier, value] = parameter.split(/[=$]+/g);
		//console.log('key: ', key, ' modifier: ', modifier, ' value: ', value);
		if (modifier === 'like') {
			searchObj[key] = {
				...searchObj[key],
				$regex: '.*' + value + '.*',
			};
		} else if (modifier === 'gte') {
			searchObj[key] = {
				...searchObj[key],
				$gte: value,
			};
		} else if (modifier === 'lte') {
			searchObj[key] = {
				...searchObj[key],
				$lte: value,
			};
		} else {
			searchObj[key] = value;
		}
	}

	return searchObj;
};

export { parseSearchString };
