import mongoose from 'mongoose';
import sequence from 'mongoose-sequence';

// Auto Increment ID
const AutoIncrement = sequence(mongoose);

// Schema
const QuestionSchema = new mongoose.Schema({
    questionId: {
        type: Number,
        unique: true
    },
    question: {
        type: String,
        required: true
    },
    // An empty string means that the question is not province-specific
    province: {
        type: String,
        default: ""
    },
    choices: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
});

// Apply plugin to questionId field
QuestionSchema.plugin(AutoIncrement, {inc_field: 'questionId'});

const QuestionModel = mongoose.model('Question', QuestionSchema);

export default QuestionModel;