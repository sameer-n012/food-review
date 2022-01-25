import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchObject, clearSearchObject } from '../actions/appActions';
import { formatDate, getToday, isValidDate } from '../resources/dateTools';

const SearchForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { error: searcherror, searchobj } = useSelector(
		(state) => state.searchObject
	);

	const [formFields, setFormFields] = useState({
		author_name: searchobj.author_name ? searchobj.author_name : '',
		name: searchobj.name ? searchobj.name : '',
		restaurant: searchobj.restaurant ? searchobj.restaurant : '',
		author_name_mod: searchobj.author_name_mod
			? searchobj.author_name_mod
			: 'exact',
		name_mod: searchobj.name_mod ? searchobj.name_mod : 'exact',
		restaurant_mod: searchobj.restaurant_mod
			? searchobj.restaurant_mod
			: 'exact',
		rating_gte: searchobj.rating_gte ? searchobj.rating_gte : 0,
		rating_lte: searchobj.rating_lte ? searchobj.rating_lte : 5,
		lastDate_gte: searchobj.lastDate_gte
			? searchobj.lastDate_gte
			: '1970-01-01',
		lastDate_lte: searchobj.lastDate_lte
			? searchobj.lastDate_lte
			: getToday(),
	});
	const handleEditFormFields = (event) => {
		console.log('editing ', event.target.name, ' to ', event.target.value);
		if (event.target.value === 'Exactly Matches') {
			event.target.value = 'exact';
		}
		if (event.target.value === 'Contains') {
			event.target.value = 'like';
		}
		setFormFields({
			...formFields,
			[event.target.name]: event.target.value,
		});
	};

	const updateSO = () => {
		if (formFields.lastDate_gte && !isValidDate(formFields.lastDate_gte)) {
			console.log('invalid date');
			return;
		}
		if (formFields.lastDate_lte && !isValidDate(formFields.lastDate_lte)) {
			console.log('invalid date');
			return;
		}
		console.log(formFields);
		dispatch(
			updateSearchObject({
				...formFields,
			})
		);
		navigate('/');
	};
	const clearSO = () => {
		setFormFields({
			author_name: '',
			name: '',
			restaurant: '',
			restaurant_mod: 'exact',
			name_mod: 'exact',
			author_name_mod: 'exact',
			rating_gte: 0,
			rating_lte: 5,
			lastDate_gte: '1970-01-01',
			lastDate_lte: getToday(),
		});
		dispatch(clearSearchObject());
		navigate('/search');
	};

	return (
		//TODO fix styling of search form and add fields
		<Container fluid className='d-flex flex-column'>
			<Row className='mb-4'>
				<Form.Label htmlFor='soAuthorName' className='editFormLabel-s'>
					Author Username
				</Form.Label>
				<Form.Select
					name='author_name_mod'
					id='soAuthorNameMod'
					className='editFormField-s'
					value={formFields.author_name_mod}
					onChange={(e) => handleEditFormFields(e)}
				>
					<option>Exactly Matches</option>
					<option>Contains</option>
				</Form.Select>
				<Form.Control
					type='text'
					name='author_name'
					id='soAuthorName'
					className='editFormField'
					value={formFields.author_name}
					onChange={(e) => handleEditFormFields(e)}
				/>
			</Row>
			<Row className='mb-4'>
				<Form.Label htmlFor='soName' className=' editFormLabel-s'>
					Food Name
				</Form.Label>
				<Form.Select
					name='name_mod'
					id='soNameMod'
					className=' editFormField-s'
					value={formFields.name_mod}
					onChange={(e) => handleEditFormFields(e)}
				>
					<option>Exactly Matches</option>
					<option>Contains</option>
				</Form.Select>
				<Form.Control
					type='text'
					name='name'
					id='soName'
					className='editFormField'
					value={formFields.name}
					onChange={(e) => handleEditFormFields(e)}
				/>
			</Row>
			<Row className='mb-4'>
				<Form.Label htmlFor='soRestaurant' className='editFormLabel-s'>
					Restaurant
				</Form.Label>
				<Form.Select
					name='restaurant_mod'
					id='restaurantMod'
					className='editFormField-s'
					value={formFields.restaurant_mod}
					onChange={(e) => handleEditFormFields(e)}
				>
					<option>Exactly Matches</option>
					<option>Contains</option>
				</Form.Select>
				<Form.Control
					type='text'
					name='restaurant'
					id='soRestaurant'
					className='editFormField'
					value={formFields.restaurant}
					onChange={(e) => handleEditFormFields(e)}
				/>
			</Row>

			<Row className='mb-4'>
				<Form.Label htmlFor='soRatingGTE' className='editFormLabel'>
					Rating greater than
				</Form.Label>
				<Form.Control
					type='number'
					max='5'
					min='0'
					step='0.5'
					name='rating_gte'
					id='soRatingGTE'
					className='editFormField'
					value={formFields.rating_gte}
					onChange={(e) => handleEditFormFields(e)}
				/>
			</Row>
			<Row className='mb-4'>
				<Form.Label htmlFor='soRatingLTE' className='editFormLabel'>
					Rating less than
				</Form.Label>
				<Form.Control
					type='number'
					max='5'
					min='0'
					step='0.5'
					name='rating_lte'
					id='soRatingLTE'
					className='editFormField'
					value={formFields.rating_lte}
					onChange={(e) => handleEditFormFields(e)}
				/>
			</Row>
			<Row className='mb-4'>
				<Form.Label htmlFor='soDateGTE' className='editFormLabel'>
					Reviewed after (YYYY-MM-DD)
				</Form.Label>
				<Form.Control
					type='text'
					name='lastDate_gte'
					id='soDateGTE'
					className='editFormField'
					value={formFields.lastDate_gte}
					onChange={(e) => handleEditFormFields(e)}
				/>
			</Row>
			<Row className='mb-4'>
				<Form.Label htmlFor='soDateLTE' className='editFormLabel'>
					Reviewed before (YYYY-MM-DD)
				</Form.Label>
				<Form.Control
					type='text'
					name='lastDate_lte'
					id='soDateLTE'
					className='editFormField'
					value={formFields.lastDate_lte}
					onChange={(e) => handleEditFormFields(e)}
				/>
			</Row>
			<Row className='mb-4'>
				<Stack
					direction='horizontal'
					className='justify-content-evenly align-items-center'
				>
					<Button
						className='btn m-2 mt-0'
						variant='outline-dark'
						size='m'
						value='submit'
						onClick={() => navigate('/')}
					>
						Cancel
					</Button>

					<Button
						className='btn m-2 mt-0'
						variant='outline-dark'
						size='m'
						value='submit'
						onClick={() => clearSO()}
					>
						Reset
					</Button>
					<Button
						className='btn m-2 mt-0'
						variant='outline-dark'
						size='m'
						value='submit'
						onClick={() => updateSO()}
					>
						Search
					</Button>
				</Stack>
			</Row>
		</Container>
	);
};

export default SearchForm;
