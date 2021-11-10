const responseStatus = require('../constants/responseStatus.constant');
const wsEvent = require('../constants/wsEvent.constant');
const {
    createAddFriendNotification,
    createAcceptInviteFriendNotification,
} = require('../services/notification.service');
const relationshipService = require('../services/relationship.service');

exports.relationship = (io, socket) => {
    socket.on(wsEvent.INVITE_FRIEND, async (receiver, callback) => {
        try {
            const inviter = socket.user._id;

            const relationship = await relationshipService.createRelationship(
                inviter,
                receiver
            );
            const newNotification = await createAddFriendNotification(
                receiver,
                inviter
            );
            const notificationData = {
                ...newNotification._doc,
                dispatcher: { ...socket.user },
            };
            io.in(`${receiver}`).emit(wsEvent.NOTIFICATION, notificationData);
            callback({
                status: responseStatus.SUCCESS,
            });
        } catch (error) {
            socket.emit('error', error.message);
        }
    });

    socket.on(
        wsEvent.ACCEPT_INVITE_FRIEND,
        async (relationshipId, receiver, callback) => {
            try {
                const acceptor = socket.user._id;
                await relationshipService.updateRelationship(relationshipId);
                const newNotification =
                    await createAcceptInviteFriendNotification(
                        receiver,
                        acceptor
                    );
                const notificationData = {
                    ...newNotification._doc,
                    dispatcher: { ...socket.user },
                };
                io.in(`${receiver}`).emit(
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
