import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';

const NavigationBar = ({ navs }) => {
	const [activeLink, setActiveLink] = useState(navs[0].link); //TODO use redux application state instead

	return (
		<Nav
			className='navigationbar-container pt-2 bg-dark'
			style={{ backgroundColor: 'black' }} //TODO remove inline styling
			justify
			variant='tabs'
			defaultActiveKey={navs[0].link}
		>
			{navs.map((nav) => (
				<Nav.Item key={nav.link} href={nav.link}>
					<Nav.Link
						onSelect={() => console.log('switching tab')} //FIXME navbar not switching active tabs on click
						active={nav.link === activeLink}
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
