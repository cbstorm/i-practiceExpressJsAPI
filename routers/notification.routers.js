const express = require('express');
const {
    getAllNotifications,
    readAllNotifications,
    deleteAllNotifications,
} = require('../controllers/notification.controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/getAllNotifications', authMiddleware, getAllNotifications);
router.put('/readAllNotifications', authMiddleware, readAllNotifications);
router.delete(
    '/deleteAllNotifications',
    authMiddleware,
    deleteAllNotifications
);
module.exports = router;
