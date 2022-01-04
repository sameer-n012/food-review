import { isValidDate } from './dateTools.js';

const searchReviews = (reviewList, searchObj) => {
	let newReviews = [];

	if (!isValidDate(searchObj.minDate) || !isValidDate(searchObj.maxDate)) {
		return newReviews;
	}

	for (const review of reviewList) {
		//checks name
		if (!review.name.contains(searchObj.nameLike)) {
			continue;
		}

		//checks restaurant
		if (!review.restaurant.contains(searchObj.restaurantLike)) {
			continue;
		}

		//checks date
		if (!isValidDate(review.lastDate)) {
			continue;
		}
		if (review.lastDate < searchObj.minDate) {
			continue;
		}
		if (review.lastDate > searchObj.maxDate) {
			continue;
		}

		//checks rating
		if (review.rating < searchObj.minRating) {
			continue;
		}
		if (review.rating > searchObj.maxRating) {
			continue;
		}

		//checks author TODO
		if (searchObj.author != null && !true) {
			continue;
		}

		newReviews.push(review);
	}

	switch (searchObj.sortBy) {
		case 'date':
			newReviews.sort((x, y) => (x.lastDate > y.lastDate ? 1 : -1));
			break;
		case 'author':
			// newReviews.sort((x, y) => (x.lastDate > y.lastDate ? 1 : -1)); TODO
			break;
		case 'name':
			newReviews.sort((x, y) => (x.name > y.name ? 1 : -1));
			break;
		case 'restaurant':
			newReviews.sort((x, y) => (x.restaurant > y.restaurant ? 1 : -1));
			break;
		case 'rating':
			newReviews.sort((x, y) => (x.rating > y.rating ? 1 : -1));
			break;
		default:
			break;
	}

	if (!searchObj.sortAsc) {
		newReviews.reverse();
	}

	return newReviews;
};

const searchReviewsDefault = (reviewList) => {
	const searchObj = {
		nameLike: '',
		restaurantLike: '',
		minDate: '1990-01-01',
		maxDate: '9999-99-99',
		minRating: 0,
		maxRating: 5,
		authorEquals: null,
		sortBy: 'date',
		sortAsc: false,
	};

	searchReviews(reviewList, searchObj);
};

export { searchReviews, searchReviewsDefault };
