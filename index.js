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
try {
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Connection successful');
}
// Show initial connection error, if any
catch(error) {
    console.log('An error has occurred', error);
}

// Display errors after initial connection has been established, if any
mongoose.connection.on('error', (error) => console.log('An error has occurred after initial connection', error));

// Use JSON
app.use(express.json());

// Routes
app.use('/questions', QuestionRoutes);

// Listen
app.listen(port, () => console.log('Server is running'));