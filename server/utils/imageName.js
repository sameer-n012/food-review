import moment from 'moment';

const generateImageName = (userid, imageName) => {
	const now = moment().format('MMDDYYYYHHmmssSSS');
	const [name, ext] = imageName.split('.');
	return name + now.toString() + '.' + ext;
};

export { generateImageName };
