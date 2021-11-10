const express = require('express');
const {
    checkRelationshipStatus,
    rejectInviteFriend,
    getAllFriends,
} = require('../controllers/relationship.controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get(
    '/checkRelationshipStatus/:userId',
    authMiddleware,
    checkRelationshipStatus
);

router.get('/getAllFriends', authMiddleware, getAllFriends);

router.delete('/rejectInviteFriend/:relationshipId', rejectInviteFriend);

module.exports = router;
