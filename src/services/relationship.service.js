const relationshipStatus = require('../constants/relationshipStatus.constant');
const Relationship = require('../models/Relationship.model');

exports.createRelationship = async (inviter, receiver) => {
    const users = [inviter, receiver];
    const relationship = await Relationship.create({
        users,
        inviter,
        receiver,
        status: relationshipStatus.INVITING,
    });
    return relationship;
};

exports.getAllFriends = async (userId) => {
    const user = [userId];
    const friends = await Relationship.find({ users: { $in: user } })
        .populate({ path: 'inviter', select: '_id name avatarUrl' })
        .populate({ path: 'receiver', select: '_id name avatarUrl' });
    return friends;
};

exports.updateRelationship = async (relationshipId) => {
    await Relationship.findByIdAndUpdate(relationshipId, {
        status: relationshipStatus.FRIEND,
    });
};

exports.deleteRelationship = async (relationshipId) => {
    await Relationship.findByIdAndDelete(relationshipId);
};

exports.checkRelationshipStatus = async (user1, user2) => {
    const relationship = await Relationship.findOne({
        users: { $all: [user1, user2] },
    });
    if (!relationship) {
        return null;
    }
    return relationship;
};
