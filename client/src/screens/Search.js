import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';

const Search = () => {
	const { error: searcherror, searchobj } = useSelector(
		(state) => state.searchObject
	);
	const { error: usererror, cu } = useSelector((state) => state.currentUser);

	return (
		<>
			<Header title='Food Review' loggedIn={!!cu} />
			<Container className='p-2 mt-5 above-footer'>
				{searcherror ? (
					<p className='text-center mt-5'>
						Sorry something went wrong
					</p>
				) : (
					<SearchForm isAdding={true} currentUser={cu} />
				)}
			</Container>
			<Footer />
		</>
	);
};

export default Search;
