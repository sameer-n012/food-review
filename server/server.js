import express from 'express';
import connectDB from './utils/db.js';
import dotenv from 'dotenv';

//import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.send('api is running');
});

//app.use('/review', reviewRoutes);

const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV;

app.listen(
	port,
	console.log(`Server is running in ${mode} mode on port ${port}`)
);
