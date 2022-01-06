import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'react-bootstrap';

const Header = ({ title, bgColor, txtColor, signin }) => {
	//TODO add props to switch between signin and login button
	const onClick = () => {
		console.log('Click');
	};

	//QUESTION better way to link than href (use react hooks?)
	return (
		<Container
			className='m-0 p-4 header'
			style={{ backgroundColor: bgColor, color: txtColor }} //TODO remove inline styling
		>
			<h1 className='cursor-clickable'>
				<a href='/' className='header-title-link'>
					{title}
				</a>
			</h1>
			{signin ? ( //TODO make switch between signin and logout button
				<Button
					className='btn m-2'
					variant='outline-light'
					size='m'
					href='/signin'
				>
					Sign In
				</Button>
			) : (
				<></>
			)}
		</Container>
	);
};

Header.defaultProps = {
	bgColor: 'white',
	txtColor: 'black',
	signin: true,
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
	bgColor: PropTypes.string,
	txtColor: PropTypes.string,
	signin: PropTypes.bool,
};

export default Header;
