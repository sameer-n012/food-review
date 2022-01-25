import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const SearchForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { error: searcherror, searchobj } = useSelector(
		(state) => state.searchObject
	);

	const [formFields, setFormFields] = useState({
		author_name: searchobj.author_name$like,
		name: searchobj.name$like,
		restaurant: searchobj.restaurant$like,
		//TODO add rest of fields
	});
	const handleEditFormFields = (event) => {
		setFormFields({
			...formFields,
			[event.target.name]: event.target.value,
		});
	};

	//TODO add update search object funtion
	//TODO add clear search object function

	return (
		//TODO fix styling of search form and add fields
		<Container fluid className='d-flex flex-column'>
			<Row className='mb-4'>
				<Form.Label
					htmlFor='soAuthorName'
					className='w-25 editFormLabel'
				>
					Author Username:
				</Form.Label>
				<Form.Select
					name='authorNameMod'
					id='soAuthorNameMod'
					className='w-25 editFormField'
					value={formFields.author_name_mod}
				>
					<option>Exactly Matches</option>
					<option>Contains</option>
				</Form.Select>
				<Form.Control
					type='text'
					name='authorName'
					id='soAuthorName'
					className='editFormField'
					value={formFields.author_name}
				/>
			</Row>

			<Row className='mb-4'>
				<Form.Label htmlFor='soName' className='editFormLabel'>
					Food Name:
				</Form.Label>
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
				<Form.Label htmlFor='soRestaurant' className='editFormLabel'>
					Restaurant:
				</Form.Label>
				<Form.Control
					type='text'
					name='restaurant'
					id='soRestaurant'
					className='editFormField'
					value={formFields.restaurant}
					onChange={(e) => handleEditFormFields(e)}
				/>
			</Row>
		</Container>
	);
};

export default SearchForm;
