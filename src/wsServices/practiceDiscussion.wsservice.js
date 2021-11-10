const wsEvent = require('../constants/wsEvent.constant');
const Practice = require('../models/Practice.model');
const discussionService = require('../services/discussion.service');
const {
    createDiscussPracticeNotification,
} = require('../services/notification.service');

exports.practiceDiscussion = (io, socket) => {
    socket.on(
        wsEvent.DISCUSS_PRACTICE,
        async ({ practiceId, discussContent }) => {
            try {
                const user = socket.user;
                const practice = await Practice.findById(practiceId);
                if (practice) {
                    const practiceCreator = practice.creator;
                    const newDiscuss = await discussionService.createDiscuss(
                        practiceId,
                        user._id,
                        discussContent
                    );
                    if (user._id !== practiceCreator.toString()) {
                        const newNotification =
                            await createDiscussPracticeNotification(
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
                    const discussData = {
                        ...newDiscuss._doc,
                        creator: { ...user },
                    };
                    io.emit(
                        `${wsEvent.NEW_DISCUSS} ${practice._id}`,
                        discussData
                    );
                }
            } catch (error) {
                socket.emit('error', error.message);
            }
        }
    );
};
