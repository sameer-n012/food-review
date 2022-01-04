import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';

const NavigationBar = ({ navs }) => {
	const [activeLink, setActiveLink] = useState(navs[0].link);

	return (
		<Nav
			className='navigationbar-container pt-2 bg-dark'
			style={{ backgroundColor: 'black' }}
			justify
			variant='tabs'
			defaultActiveKey={navs[0].link}
		>
			{navs.map((nav) => (
				<Nav.Item key={nav.link} href={nav.link}>
					<Nav.Link
						onSelect={() => console.log('switching tab')} //TODO fix navbar problem and styling
						active={nav.link === activeLink}
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
