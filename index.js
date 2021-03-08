import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import QuestionRoutes from './routes/QuestionRoute.js';

// Configure .env
dotenv.config();
const app = express();

// Port Number
const port = process.env.PORT || 4000;

// Connect to the database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to the database'));

// Display errors after initial connection has been established, if any
mongoose.connection.on('error', (error) => console.log('An error has occurred after initial connection', error));

// Use JSON
app.use(express.json());

// Routes
app.use('/questions', QuestionRoutes);

// Listen
app.listen(port, () => console.log('Server is running'));