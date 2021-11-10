const responseStatus = require('../constants/responseStatus.constant');
const searchService = require('../services/search.service');
exports.search = async (req, res, next) => {
    try {
        const { q } = req.query;
        const users = await searchService.searchUsers(q);
        const practices = await searchService.searchPractices(q);
        return res
            .status(200)
            .json({
                status: responseStatus.SUCCESS,
                data: { users, practices },
            });
    } catch (error) {
        next(error);
    }
};
