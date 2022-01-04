import Review from './Review.js';
import ActionCard from './ActionCard.js';
import { Container, Col, Row } from 'react-bootstrap';
import { searchReviewsDefault } from '../resources/searchReviews.js';

const Reviews = ({ reviews, onDelete }) => {
	reviews.sort((x, y) => (x.lastDate > y.lastDate ? 1 : -1)).reverse();

	//reviews = searchReviewsDefault(reviews);

	return (
		<Container fluid className='d-flex p-2 mt-5'>
			<Row xs='auto'>
				<Col>
					<ActionCard />
				</Col>

				{reviews.map((review) => (
					<Col key={review.id}>
						<Review review={review} onDelete={onDelete} />
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default Reviews;
