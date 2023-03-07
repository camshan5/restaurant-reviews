import express from 'express';
import cors from 'cors';
import restaurants from './api/restaurants.route.js';

// configure Express server
const app = express();

app.use(cors());
app.use(express.json());

// configure routes
app.use('/api/v1/restaurants', restaurants);

// incorrect route error handling
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app
