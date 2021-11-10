const { PracticeNoneDetailsDTO, PracticeDTO } = require('../dtos/Practice.dto');
const Practice = require('../models/Practice.model');
const practiceService = require('../services/practice.service');

exports.createPractice = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const practiceData = req.body;
        await practiceService.createPractice(_id, practiceData);
        return res.status(201).json({ status: 'success' });
    } catch (error) {
        next(error);
    }
};

exports.getMyPractices = async (req, res, next) => {
    try {
        const { _id } = req.user;
        let { page, limit } = req.query;
        const practices = await practiceService.getMyPractices(
            _id,
            page,
            limit
        );
        return res.status(200).json({ status: 'success', data: practices });
    } catch (error) {
        next(error);
    }
};

exports.getSinglePractice = async (req, res, next) => {
    try {
        const { practiceId } = req.params;
        const practiceData = await practiceService.getSinglePractice(
            practiceId
        );
        return res.status(200).json({ status: 'success', data: practiceData });
    } catch (error) {
        next(error);
    }
};

exports.getPracticeHaveQuestionList = async (req, res, next) => {
    try {
        const { practiceId } = req.params;
        const practice = await practiceService.getPracticeHaveQuestionList(
            practiceId
        );
        return res.status(200).json({ status: 'success', data: practice });
    } catch (error) {
        next(error);
    }
};

exports.getNewestPracticeList = async (req, res, next) => {
    try {
        let { page, limit } = req.query;
        const practices = await practiceService.getNewestPracticeList(
            page,
            limit
        );
        return res.status(200).json({ status: 'success', data: practices });
    } catch (error) {
        next(error);
    }
};

exports.getUserPracticeList = async (req, res, next) => {
    try {
        const { userId } = req.params;
        let { page, limit } = req.query;
        const practices = await practiceService.getUserPracticeList(
            userId,
            page,
            limit
        );
        return res.status(200).json({ status: 'success', data: practices });
    } catch (error) {
        next(error);
    }
};

exports.getClassPracticeList = async (req, res, next) => {
    try {
        const { classId } = req.params;
        let { page, limit } = req.query;
        const practices = await practiceService.getClassPracticeList(
            classId,
            page,
            limit
        );
        return res.status(200).json({ status: 'success', data: practices });
    } catch (error) {
        next(error);
    }
};

exports.deletePractice = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { practiceId } = req.params;
        await practiceService.deletePractice(_id, practiceId);
        return res.status(200).json({ status: 'success' });
    } catch (error) {
        next(error);
    }
};
