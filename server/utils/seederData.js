import bcrypt from 'bcrypt';

//TODO update seeder data to include username in review when changing review model

const reviews = [
	{
		name: 'Burger',
		image: '/images/0.jpg',
		restaurant: 'Burger King',
		rating: 4.5,
		lastDate: '2021-10-10',
		private: true,
		notes: '',
	},
	{
		name: 'Fries',
		image: '/images/1.jpg',
		restaurant: "McDonald's",
		rating: 4,
		lastDate: '2021-12-04',
		private: false,
		notes: '',
	},
	{
		name: 'McFlurry',
		image: '/images/2.jpg',
		restaurant: "McDonald's",
		rating: 5,
		lastDate: '2021-12-04',
		private: true,
		notes: 'very good',
	},
	{
		name: 'Burger',
		image: '/images/3.jpg',
		restaurant: "Wendy's",
		rating: 2,
		lastDate: '2021-05-19',
		private: true,
		notes: '',
	},
	{
		name: 'Fries',
		image: '/images/4.jpg',
		restaurant: "Wendy's",
		rating: 3,
		lastDate: '2021-05-19',
		private: false,
		notes: 'do not try again',
	},
];

const users = [
	{
		username: 'user0',
		password: bcrypt.hashSync('user0password', 10),
	},
	{
		username: 'user1',
		password: bcrypt.hashSync('user1password', 10),
	},
	{
		username: 'user2',
		password: bcrypt.hashSync('user2password', 10),
	},
	{
		username: 'user3',
		password: bcrypt.hashSync('user3password', 10),
	},
];

export { reviews, users };
