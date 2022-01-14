import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
	return (
		<Container className='m-0 p-0 ps-4 pe-4 footer'>
			<Container className=' w-50 d-flex'>
				<p className='m-0'>Created By Sameer N.</p>
				<p className='m-0 ms-2'>|</p>
				<a className='m=0 ms-2 not-link cursor-clickable'>
					Project Github
				</a>
			</Container>
			<Container className='w-50 me-0 ms-0 float-right d-flex justify-content-end w-50'>
				<Container className='w-25 d-flex justify-content-end m-0 ms-auto'>
					Attribution:
				</Container>
				<Container className='w-25 d-flex flex-column m-0'>
					<a
						className='not-link cursor-clickable'
						href='https://icons8.com'
						target='_blank'
						rel='noopener noreferrer'
					>
						Icons8
					</a>
					<a
						className='not-link cursor-clickable'
						href='https://fontawesome.com'
						target='_blank'
						rel='noopener noreferrer'
					>
						FontAwesome
					</a>
				</Container>
			</Container>
		</Container>
	);
};

Footer.propTypes = {};

export default Footer;
