const practiceSharings = require('../constants/practiceSharings.constant');
const {
    PracticeNoneDetailsDTO,
    PracticeHaveQuestionListDTO,
    PracticeInfoDTO,
} = require('../dtos/Practice.dto');
const Practice = require('../models/Practice.model');

exports.createPractice = async (creatorId, practiceData) => {
    await Practice.create({
        ...practiceData,
        creator: creatorId,
    });
};

exports.getNewestPracticeList = async (page, limit) => {
    if (!page) {
        page = 0;
    }
    if (!limit) {
        limit = 5;
    }
    const limitInt = parseInt(limit);
    const skip = limitInt * parseInt(page);
    const practices = await Practice.find({
        sharing: practiceSharings.PUBLIC,
    })
        .sort('-createdAt')
        .skip(skip)
        .limit(limitInt)
        .populate('creator');
    if (practices.length > 0) {
        const practiceListData = practices.map(
            (practice) => new PracticeInfoDTO(practice)
        );
        return practiceListData;
    }
    return practices;
};

exports.getMyPractices = async (creatorId, page, limit) => {
    if (!page) {
        page = 0;
    }
    if (!limit) {
        limit = 5;
    }
    const limitInt = parseInt(limit);
    const skip = limitInt * parseInt(page);
    const practices = await Practice.find({
        creator: creatorId,
        $or: [
            { sharing: practiceSharings.PUBLIC },
            { sharing: practiceSharings.PRIVATE },
        ],
    })
        .sort('-createdAt')
        .skip(skip)
        .limit(limitInt)
        .populate('creator');
    if (practices > 0) {
        const practiceList = practices.map(
            (practice) => new PracticeInfoDTO(practice)
        );
        return practiceList;
    }
    return practices;
};

exports.getUserPracticeList = async (userId, page, limit) => {
    if (!page) {
        page = 0;
    }
    if (!limit) {
        limit = 5;
    }
    const limitInt = parseInt(limit);
    const skip = parseInt(page) * limitInt;
    const practices = await Practice.find({
        creator: userId,
        sharing: practiceSharings.PUBLIC,
    })
        .sort('-createdAt')
        .skip(skip)
        .limit(limitInt)
        .populate('creator');
    if (practices?.length < 0) {
        return practices;
    }
    const practiceList = practices.map((practice) => {
        return new PracticeInfoDTO(practice);
    });
    return practiceList;
};

exports.getClassPracticeList = async (classId, page, limit) => {
    if (!page) {
        page = 0;
    }
    if (!limit) {
        limit = 5;
    }
    const limitInt = parseInt(limit);
    const skip = parseInt(page) * limitInt;
    const practices = await Practice.find({
        classId,
    })
        .sort('-createdAt')
        .skip(skip)
        .limit(limitInt)
        .populate('creator');
    if (practices?.length < 0) {
        return practices;
    }
    const practiceList = practices.map((practice) => {
        return new PracticeInfoDTO(practice);
    });
    return practiceList;
};

exports.getSinglePractice = async (practiceId) => {
    const practice = await Practice.findById(practiceId).populate('creator');
    if (!practice) {
        const err = new Error('NOT_FOUND');
        err.statusCode = 404;
        throw err;
    }
    const practiceData = new PracticeInfoDTO(practice);
    return practiceData;
};

exports.getPracticeHaveQuestionList = async (practiceId) => {
    const practice = await Practice.findById(practiceId);
    if (!practice) {
        const err = new Error('NOT_FOUND');
        err.statusCode = 404;
        throw err;
    }
    const practiceData = new PracticeHaveQuestionListDTO(practice);
    return practiceData;
};

exports.deletePractice = async (creatorId, practiceId) => {
    await Practice.findOneAndDelete({
        _id: practiceId,
        creator: creatorId,
    });
};
