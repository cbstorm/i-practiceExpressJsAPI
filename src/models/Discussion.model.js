const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema(
    {
        practice: {
            type: Schema.Types.ObjectId,
            ref: 'Practice',
        },
        content: {
            type: String,
            required: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const Discussion = mongoose.model('Discussion', DiscussionSchema);

module.exports = Discussion;
