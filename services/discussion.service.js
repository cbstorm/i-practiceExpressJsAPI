const Discussion = require('../models/Discussion.model');

exports.getAllDiscussionOfPractice = async (practiceId) => {
    const discussions = await Discussion.find({
        practice: practiceId,
    })
        .sort('-createdAt')
        .populate({ path: 'creator', select: '_id name avatarUrl' });
    return discussions;
};

exports.createDiscuss = async (practiceId, userId, discussContent) => {
    const newDiscuss = await Discussion.create({
        practice: practiceId,
        creator: userId,
        content: discussContent,
    });
    return newDiscuss;
};
