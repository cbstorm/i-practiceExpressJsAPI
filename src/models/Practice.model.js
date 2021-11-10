const mongoose = require('mongoose');
const practiceSharings = require('../constants/practiceSharings.constant');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    demand: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    correctAnswers: {
        type: Array,
    },
    type: {
        type: String,
        required: true,
    },
    options: {
        type: Array,
    },
});

const PracticeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        },
        limitTime: {
            type: Boolean,
            required: true,
        },
        timeLimited: {
            type: Number,
        },
        questionList: [QuestionSchema],
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        sharing: {
            type: String,
            enum: [
                practiceSharings.PUBLIC,
                practiceSharings.PRIVATE,
                practiceSharings.CLASS,
            ],
        },
        classId: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Practice = mongoose.model('Practice', PracticeSchema);
module.exports = Practice;
