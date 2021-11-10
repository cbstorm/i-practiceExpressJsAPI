const classService = require('../services/classes.service');
const userInteractWithClassesService = require('../services/userInteractWithClasses.service');
exports.createClass = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const classData = req.body;
        const responseData = await classService.createClass(classData, _id);
        return res.status(201).json(responseData);
    } catch (error) {
        if (error.response.data) {
            next(error.response.data);
            return;
        }
        next(error);
    }
};

exports.getOneClass = async (req, res, next) => {
    try {
        const { classId } = req.params;
        const responseData = await classService.getOneClass(classId);
        return res.status(200).json(responseData);
    } catch (error) {
        if (error.response.data) {
            next(error.response.data);
            return;
        }
        next(error);
    }
};

exports.unInviteMember = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { classId } = req.params;
        const { userId } = req.body;
        const responseData = await classService.unInviteMember(
            classId,
            userId,
            _id
        );
        return res.status(200).json(responseData);
    } catch (error) {
        next(error);
    }
};

exports.deleteMember = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { classId } = req.params;
        const { joinedId } = req.body;
        const responseData = await classService.deleteMember(
            classId,
            _id,
            joinedId
        );
        return res.status(200).json(responseData);
    } catch (error) {
        next(error);
    }
};

exports.getClassesOfUser = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const responseData =
            await userInteractWithClassesService.getClassesOfUser(_id);
        return res.status(200).json(responseData);
    } catch (error) {
        if (error.response.data) {
            next(error.response.data);
            return;
        }
        next(error);
    }
};

exports.rejectJoinClass = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { classId } = req.params;
        const responseData =
            await userInteractWithClassesService.rejectJoinClass(classId, _id);
        return res.status(200).json(responseData);
    } catch (error) {
        next(error);
    }
};

exports.rejectRequestJoinClass = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { classId } = req.params;
        const { joinRequestId } = req.body;
        const responseData = await classService.rejectRequestJoinClass(
            classId,
            joinRequestId,
            _id
        );
        return res.status(200).json(responseData);
    } catch (error) {
        next(error);
    }
};

exports.destroyRequestJoinClass = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { classId } = req.params;
        const responseData =
            await userInteractWithClassesService.sendOrDestroyRequestJoinClass(
                classId,
                _id
            );
        return res.status(200).json(responseData);
    } catch (error) {
        next(error);
    }
};

exports.leaveClass = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { classId } = req.params;
        const responseData = await userInteractWithClassesService.leaveClass(
            classId,
            _id
        );
        return res.status(200).json(responseData);
    } catch (error) {
        next(error);
    }
};

exports.deleteClass = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { classId } = req.params;
        const responseData = await classService.deleteClass(classId, _id);
        return res.status(200).json(responseData);
    } catch (error) {
        next(error);
    }
};
