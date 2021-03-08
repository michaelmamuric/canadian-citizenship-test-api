import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// CORS headers
const setHeaders = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "POST, GET");
    next();
}

// Generate 20 questions, pooled randomly
router.get('/', setHeaders, async(req, res) => {
    try {
        // Questions Array
        const questions = [];

        // List of Valid Provinces
        const validProvinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

        // Create sets for the generic questions
        const genericIndices = new Set();

        // First, check if the province parameter is supplied or not
        const province = req.query.province;

        // If a valid province is supplied, generate 18 generic and 2 province-specific questions
        if(province && validProvinces.includes(province.toUpperCase())) {
            // Select generic questions and store in an array
            const genericQuestions = await Question.find({ province: "" });

            // Populate set until 18 unique indices are obtained
            while(genericIndices.size !== 18) {
                genericIndices.add(Math.floor(Math.random() * genericQuestions.length - 1) + 1);
            }

            // Get generic indices and store them in an array
            const genericIndicesArray = [...genericIndices];

            // Loop thru genericIndices array
            genericIndicesArray.forEach((randomIndex) => {
                questions.push(genericQuestions[randomIndex])
            });

            // Select questions that are province-specific
            const specificQuestions = await Question.find({ province: province.toUpperCase() });

            // Create a set for province-specific questions
            const specificIndices = new Set();

            // Populate set until 2 unique indices are obtained
            while(specificIndices.size !== 2) {
                specificIndices.add(Math.floor(Math.random() * specificQuestions.length - 1) + 1);
            }

            // Get specific indices and store them in an array
            const specificIndicesArray = [...specificIndices];

            // Loop thru specificIndicesArray array
            specificIndicesArray.forEach((randomIndex) => {
                questions.push(specificQuestions[randomIndex])
            });
        }
        // If no province or an invalid province is supplied, generate 20 generic questions
        else {
            // Select questions that are not province-specific, and store in an array
            const genericQuestions = await Question.find({ province: ""});

            // Populate set until 20 unique indices are obtained
            while(genericIndices.size !== 20) {
                genericIndices.add(Math.floor(Math.random() * genericQuestions.length - 1) + 1);
            }

            // Get generic indices and store them in an array
            const genericIndicesArray = [...genericIndices];

            // Loop thru genericIndices array
            genericIndicesArray.forEach((randomIndex) => {
                questions.push(genericQuestions[randomIndex])
            });
        }

        // Send result
        res.send(questions);
    } catch(error) {
        res.status(500).send(error.message);
    }
})

// Add a New Question
router.post('/', setHeaders, async(req, res) => {
    // Allow POST operation only if secret key is supplied correctly
    if(req.query.key === process.env.KEY) {
        const newQuestion = new Question({
            question: req.body.question,
            choices: req.body.choices,
            correctAnswer: req.body.correctAnswer,
            province: req.body.province !== null ? req.body.province : ""
        });

        try {
            const addedQuestion = await newQuestion.save();
            res.status(201).send(addedQuestion);
        }
        catch(error) {
            res.status(400).send(error.message);
        }
    }
    else {
        res.status(401).send('Please supply the correct key.');
    }
})

export default router;