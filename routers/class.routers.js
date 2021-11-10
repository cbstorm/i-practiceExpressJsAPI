const express = require('express');
const {
    createClass,
    getClassesOfUser,
    getOneClass,
    unInviteMember,
    rejectJoinClass,
    leaveClass,
    deleteMember,
    deleteClass,
    destroyRequestJoinClass,
    rejectRequestJoinClass,
} = require('../controllers/class.controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/create', authMiddleware, createClass);
router.get('/getOneClass/:classId', getOneClass);
router.get('/getClassesOfUser', authMiddleware, getClassesOfUser);
router.delete('/unInviteMember/:classId', authMiddleware, unInviteMember);
router.delete('/rejectJoinClass/:classId', authMiddleware, rejectJoinClass);
router.delete(
    '/rejectRequestJoinClass/:classId',
    authMiddleware,
    rejectRequestJoinClass
);
router.delete('/leaveClass/:classId', authMiddleware, leaveClass);
router.delete('/deleteMember/:classId', authMiddleware, deleteMember);
router.delete('/deleteClass/:classId', authMiddleware, deleteClass);
router.delete(
    '/destroyRequestJoinClass/:classId',
    authMiddleware,
    destroyRequestJoinClass
);
module.exports = router;
