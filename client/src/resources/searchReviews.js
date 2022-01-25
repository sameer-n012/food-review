import { isValidDate } from './dateTools.js';

const createSearchString = (searchObj) => {
	console.log('search object (1) ', searchObj);
	let str = '';
	if (searchObj['name'] && searchObj['name_mod']) {
		str = str.concat(
			'name$' + searchObj['name_mod'] + '=' + searchObj['name'] + ','
		);
	}
	if (searchObj['restaurant'] && searchObj['restaurant_mod']) {
		str = str.concat(
			'restaurant$' +
				searchObj['restaurant_mod'] +
				'=' +
				searchObj['restaurant'] +
				','
		);
	}
	if (searchObj['author_name'] && searchObj['author_name_mod']) {
		console.log('a');
		str = str.concat(
			'author_name$',
			searchObj['author_name_mod'],
			'=',
			searchObj['author_name'],
			','
		);
		console.log('str', str);
	}
	if (searchObj['notes'] && searchObj['notes_mod']) {
		str = str.concat(
			'notes$' + searchObj['notes_mod'] + '=' + searchObj['notes'] + ','
		);
	}
	if (searchObj['rating_lte']) {
		str = str.concat('rating$lte=' + searchObj['rating_lte'] + ',');
	}
	if (searchObj['rating_gte']) {
		str = str.concat('rating$gte=' + searchObj['rating_gte'] + ',');
	}
	if (searchObj['lastDate_lte']) {
		str = str.concat('lastDate$lte=' + searchObj['lastDate_lte'] + ',');
	}
	if (searchObj['lastDate_gte']) {
		str = str.concat('lastDate$gte=' + searchObj['lastDate_gte'] + ',');
	}

	return str;
};

export { createSearchString };
