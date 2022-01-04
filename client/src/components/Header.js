import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'react-bootstrap';

const Header = ({ title, bgColor, txtColor }) => {
	const onClick = () => {
		console.log('Click');
	};

	return (
		<Container
			className='m-0 p-4 header'
			style={{ backgroundColor: bgColor, color: txtColor }}
		>
			<h1>{title}</h1>
			<Button
				className='menu-btn m-2'
				variant='outline-light'
				size='m'
				onClick={onClick}
			>
				Sign In
			</Button>
		</Container>
	);
};

Header.defaultProps = {
	bgColor: 'white',
	txtColor: 'black',
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
	bgColor: PropTypes.string,
	txtColor: PropTypes.string,
};

export default Header;
