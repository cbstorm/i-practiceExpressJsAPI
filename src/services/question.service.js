const Practice = require('../models/Practice.model');

exports.getQuestionList = async (practiceId) => {
    const practice = await Practice.findById(practiceId);
    if (!practice) {
        const err = new Error('NOT_FOUND');
        err.statusCode = 404;
        throw err;
    }
    const { questionList } = practice;
    return questionList;
};
