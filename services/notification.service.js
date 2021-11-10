const NotificationType = require('../constants/notificationType.constant');
const Notification = require('../models/notification.model');

exports.createDiscussPracticeNotification = async (
    subcriber,
    dispatcher,
    practice
) => {
    const newNotification = await Notification.create({
        subcriber,
        dispatcher,
        notificationType: NotificationType.DISCUSS_PRACTICE,
        practice,
    });
    return newNotification;
};

exports.createDonePracticeNotification = async (
    subcriber,
    dispatcher,
    practice
) => {
    const newNotification = await Notification.create({
        subcriber,
        dispatcher,
        notificationType: NotificationType.DONE_PRACTICE,
        practice,
    });
    return newNotification;
};

exports.createAddFriendNotification = async (subcriber, dispatcher) => {
    const newNotification = await Notification.create({
        subcriber,
        dispatcher,
        notificationType: NotificationType.ADD_FRIEND,
    });
    return newNotification;
};

exports.createAcceptInviteFriendNotification = async (
    subcriber,
    dispatcher
) => {
    const newNotification = await Notification.create({
        subcriber,
        dispatcher,
        notificationType: NotificationType.ACCEPT_INVITE_FRIEND,
    });
    return newNotification;
};

exports.createInviteJoinClassNotification = async (
    subcriber,
    dispatcher,
    classId
) => {
    const newNotification = await Notification.create({
        subcriber,
        dispatcher,
        notificationType: NotificationType.INVITE_JOIN_CLASS,
        classId,
    });
    return newNotification;
};

exports.createAcceptJoinClassNotification = async (
    subcriber,
    dispatcher,
    classId
) => {
    const newNotification = await Notification.create({
        subcriber,
        dispatcher,
        notificationType: NotificationType.ACCEPT_JOIN_CLASS,
        classId,
    });
    return newNotification;
};

exports.createRequestJoinClassNotification = async (
    subcriber,
    dispatcher,
    classId
) => {
    const newNotification = await Notification.create({
        subcriber,
        dispatcher,
        notificationType: NotificationType.JOIN_CLASS_REQUEST,
        classId,
    });
    return newNotification;
};

exports.createAcceptRequestJoinClassNotification = async (
    subcriber,
    dispatcher,
    classId
) => {
    const newNotification = await Notification.create({
        subcriber,
        dispatcher,
        notificationType: NotificationType.ACCEPT_JOIN_CLASS_REQUEST,
        classId,
    });
    return newNotification;
};

exports.getAllNotifications = async (subcriberId) => {
    const notifications = await Notification.find({ subcriber: subcriberId })
        .sort('-createdAt')
        .populate({ path: 'dispatcher', select: '_id name avatarUrl' });
    return notifications;
};

exports.readAllNotifications = async (subcriberId) => {
    await Notification.updateMany({ subcriber: subcriberId }, { isRead: true });
};

exports.deleteAllNotifications = async (subcriberId) => {
    await Notification.deleteMany({ subcriber: subcriberId });
};
