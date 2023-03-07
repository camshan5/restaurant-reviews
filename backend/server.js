import express from 'express';
import cors from 'cors';
import restaurants from './api/restaurants.route.js';

// configure Express server
const app = express();

app.use(cors());
app.use(express.json());
