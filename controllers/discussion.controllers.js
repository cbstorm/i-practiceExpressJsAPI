const responseStatus = require('../constants/responseStatus.constant');
const discussionService = require('../services/discussion.service');

exports.getAllDiscussionOfPractice = async (req, res, next) => {
    try {
        const { practiceId } = req.params;
        const discussions = await discussionService.getAllDiscussionOfPractice(
            practiceId
        );
        return res
            .status(200)
            .json({ status: responseStatus.SUCCESS, data: discussions });
    } catch (error) {
        next(error);
    }
};
