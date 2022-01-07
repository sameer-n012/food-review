import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { changeNavtab } from '../actions/appActions';

const NavigationBar = ({ navs }) => {
	const dispatch = useDispatch();

	const { navtab } = useSelector((state) => state.navbar);
	console.log(navtab);

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
				<Nav.Item key={index} href={nav.link}>
					<Nav.Link
						onSelect={() => {
							console.log('switching tab');
							toggleActiveNavtab(index);
						}} //FIXME navbar not switching active tabs on click
						active={index === navtab}
						className='navigationbar-link p-2' //FIXME change unactive tab styling
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
