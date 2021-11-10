const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NotificationType = require('../constants/notificationType.constant');

const notificationSchema = new Schema(
    {
        subcriber: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        dispatcher: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        notificationType: {
            type: String,
            enum: [
                NotificationType.DONE_PRACTICE,
                NotificationType.ADD_FRIEND,
                NotificationType.ACCEPT_INVITE_FRIEND,
                NotificationType.JOIN_CLASS_REQUEST,
                NotificationType.INVITE_JOIN_CLASS,
                NotificationType.ACCEPT_JOIN_CLASS,
                NotificationType.DISCUSS_PRACTICE,
                NotificationType.ACCEPT_JOIN_CLASS_REQUEST,
            ],
            required: true,
        },
        practice: {
            type: Schema.Types.ObjectId,
            ref: 'Practice',
        },
        classId: {
            type: String,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
