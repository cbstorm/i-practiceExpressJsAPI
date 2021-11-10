const responseStatus = require('../constants/responseStatus.constant');
const relationshipService = require('../services/relationship.service');

exports.checkRelationshipStatus = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { userId } = req.params;
        const relationship = await relationshipService.checkRelationshipStatus(
            _id,
            userId
        );
        return res
            .status(200)
            .json({ status: responseStatus.SUCCESS, data: relationship });
    } catch (error) {
        next(error);
    }
};

exports.getAllFriends = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const friends = await relationshipService.getAllFriends(_id);
        return res
            .status(200)
            .json({ status: responseStatus.SUCCESS, data: friends });
    } catch (error) {
        next(error);
    }
};

exports.rejectInviteFriend = async (req, res, next) => {
    try {
        const { relationshipId } = req.params;
        await relationshipService.deleteRelationship(relationshipId);
        return res.status(200).json({ status: responseStatus.SUCCESS });
    } catch (error) {
        next(error);
    }
};
