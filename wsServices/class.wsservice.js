const responseStatus = require('../constants/responseStatus.constant');
const wsEvent = require('../constants/wsEvent.constant');
const classService = require('../services/classes.service');
const userInteractWithClasses = require('../services/userInteractWithClasses.service');
const {
    createInviteJoinClassNotification,
    createAcceptJoinClassNotification,
    createRequestJoinClassNotification,
    createAcceptRequestJoinClassNotification,
} = require('../services/notification.service');

exports.classWsService = (io, socket) => {
    socket.on(
        wsEvent.INVITE_JOIN_CLASS,
        async ({ classId, userId }, callback) => {
            try {
                const adminId = socket.user._id;
                const response = await classService.inviteMember(
                    classId,
                    userId,
                    adminId
                );
                if (response.status === !responseStatus.SUCCESS) {
                    const error = new Error('SERVER_ERROR');
                    throw error;
                }
                const newNotification = await createInviteJoinClassNotification(
                    userId,
                    adminId,
                    classId
                );
                const notificationData = {
                    ...newNotification._doc,
                    dispatcher: { ...socket.user },
                };
                io.in(`${userId}`).emit(wsEvent.NOTIFICATION, notificationData);
                callback({
                    status: responseStatus.SUCCESS,
                });
            } catch (error) {
                socket.emit('error', error.message);
            }
        }
    );

    socket.on(
        wsEvent.ACCEPT_JOIN_CLASS,
        async ({ classId, adminId }, callback) => {
            try {
                const userId = socket.user._id;
                const response = await userInteractWithClasses.acceptJoinClass(
                    classId,
                    userId
                );
                if (response.status === !responseStatus.SUCCESS) {
                    const error = new Error('SERVER_ERROR');
                    throw error;
                }
                const newNotification = await createAcceptJoinClassNotification(
                    adminId,
                    userId,
                    classId
                );
                const notificationData = {
                    ...newNotification._doc,
                    dispatcher: { ...socket.user },
                };
                io.in(`${adminId}`).emit(
                    wsEvent.NOTIFICATION,
                    notificationData
                );
                callback({
                    status: responseStatus.SUCCESS,
                });
            } catch (error) {
                socket.emit('error', error.message);
            }
        }
    );

    socket.on(
        wsEvent.REQUEST_JOIN_CLASS,
        async ({ classId, adminId }, callback) => {
            try {
                const userId = socket.user._id;
                const response =
                    await userInteractWithClasses.sendOrDestroyRequestJoinClass(
                        classId,
                        userId
                    );
                if (response.status === !responseStatus.SUCCESS) {
                    const error = new Error('SERVER_ERROR');
                    throw error;
                }
                const newNotification =
                    await createRequestJoinClassNotification(
                        adminId,
                        userId,
                        classId
                    );
                const notificationData = {
                    ...newNotification._doc,
                    dispatcher: { ...socket.user },
                };
                io.in(`${adminId}`).emit(
                    wsEvent.NOTIFICATION,
                    notificationData
                );
                callback({
                    status: responseStatus.SUCCESS,
                });
            } catch (error) {
                socket.emit('error', error.message);
            }
        }
    );

    socket.on(
        wsEvent.ACCEPT_REQUEST_JOIN_CLASS,
        async ({ classId, request }, callback) => {
            try {
                console.log(request);
                const userId = socket.user._id;
                const response = await classService.acceptRequestJoinClass(
                    classId,
                    request._id,
                    userId
                );
                if (response.status === !responseStatus.SUCCESS) {
                    const error = new Error('SERVER_ERROR');
                    throw error;
                }
                const newNotification =
                    await createAcceptRequestJoinClassNotification(
                        request.userId,
                        userId,
                        classId
                    );
                const notificationData = {
                    ...newNotification._doc,
                    dispatcher: { ...socket.user },
                };
                io.in(`${request.userId}`).emit(
                    wsEvent.NOTIFICATION,
                    notificationData
                );
                callback({
                    status: responseStatus.SUCCESS,
                });
            } catch (error) {
                socket.emit('error', error.message);
            }
        }
    );
};
