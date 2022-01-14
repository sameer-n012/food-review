import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { changeNavtab } from '../actions/appActions';

const NavigationBar = ({ navs }) => {
	const dispatch = useDispatch();

	const { navtab } = useSelector((state) => state.navbar);

	const toggleActiveNavtab = (tabNum) => {
		dispatch(changeNavtab(tabNum));
	};

	return (
		<Nav
			className='navigationbar-container pt-2 bg-dark'
			justify
			variant='tabs'
			defaultActiveKey={navs[navtab].link}
		>
			{navs.map((nav, index) => (
				<Nav.Item
					key={index}
					href={nav.link}
					onClick={() => {
						console.log('switching to tab ', index);
						toggleActiveNavtab(index);
					}}
				>
					<Nav.Link
						active={index === navtab}
						style={{
							color: index === navtab ? 'black' : 'white',
							border: 'none',
						}}
						className='navigationbar-link p-2'
					>
						{nav.text}
					</Nav.Link>
				</Nav.Item>
			))}
		</Nav>
	);
};

NavigationBar.propTypes = {
	navs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NavigationBar;
