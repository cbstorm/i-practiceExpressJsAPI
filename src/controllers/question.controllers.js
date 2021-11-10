const questionService = require('../services/question.service');

exports.getQuestionList = async (req, res, next) => {
    try {
        const { practiceId } = req.params;
        const questionList = await questionService.getQuestionList(practiceId);
        return res.status(200).json({ status: 'success', data: questionList });
    } catch (error) {
        next(error);
    }
};
