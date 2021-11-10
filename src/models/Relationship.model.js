const mongoose = require('mongoose');
const relationshipStatus = require('../constants/relationshipStatus.constant');
const Schema = mongoose.Schema;

const RelationshipSchema = new Schema(
    {
        users: [String],
        status: {
            type: String,
            enum: [relationshipStatus.INVITING, relationshipStatus.FRIEND],
        },
        inviter: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const Relationship = mongoose.model('Relationship', RelationshipSchema);

module.exports = Relationship;
