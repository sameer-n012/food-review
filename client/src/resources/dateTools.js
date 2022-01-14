import moment from 'moment';

const formatDate = (date) => {
	if (!isValidDate(date)) {
		return 'Invalid Date';
	}

	return moment(date, 'YYYY-MM-DD', true).format('MMM. Do, YYYY');
};

const getToday = () => {
	return moment().format('YYYY-MM-DD');
};

const isValidDate = (date) => {
	const md = moment(date, 'YYYY-MM-DD', true);
	return md.isValid();
};

export { formatDate, getToday, isValidDate };
