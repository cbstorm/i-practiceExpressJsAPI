const responseStatus = require('../constants/responseStatus.constant');
const { SUCCESS } = require('../constants/responseStatus.constant');
const notificationService = require('../services/notification.service');

exports.getAllNotifications = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const notifications = await notificationService.getAllNotifications(
            _id
        );
        return res.status(200).json({ status: SUCCESS, data: notifications });
    } catch (error) {
        next(error);
    }
};

exports.readAllNotifications = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await notificationService.readAllNotifications(_id);
        return res.status(200).json({ status: responseStatus.SUCCESS });
    } catch (error) {
        next(error);
    }
};

exports.deleteAllNotifications = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await notificationService.deleteAllNotifications(_id);
        return res.status(200).json({ status: responseStatus.SUCCESS });
    } catch (error) {
        next(error);
    }
};
