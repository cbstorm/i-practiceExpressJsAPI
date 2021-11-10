const wsEvent = require('../constants/wsEvent.constant');
const Practice = require('../models/Practice.model');
const {
    createDonePracticeNotification,
} = require('../services/notification.service');

exports.donePractice = (io, socket) => {
    socket.on(wsEvent.DONE_PRACTICE, async (practiceId) => {
        try {
            const user = socket.user;
            const practice = await Practice.findById(practiceId);
            if (practice) {
                const practiceCreator = practice.creator;

                if (user._id !== practiceCreator.toString()) {
                    const newNotification =
                        await createDonePracticeNotification(
                            practiceCreator,
                            user._id,
                            practiceId
                        );
                    const notificationData = {
                        ...newNotification._doc,
                        dispatcher: { ...user },
                    };
                    io.in(`${practiceCreator}`).emit(
                        wsEvent.NOTIFICATION,
                        notificationData
                    );
                }
            }
        } catch (error) {
            socket.emit('error', error.message);
        }
    });
};
