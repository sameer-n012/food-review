import express from 'express';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import reviewRoutes from './routes/reviewRoutes.js';
import userRoutes from './routes/userRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import testRoutes from './routes/testRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

app.get('/', (req, res) => {
	res.send('api is running');
});

app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/tests', testRoutes);

const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV;

app.listen(
	port,
	console.log(`Server is running in ${mode} mode on port ${port}`)
);
