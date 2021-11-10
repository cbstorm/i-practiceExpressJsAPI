const express = require('express');
const {
    getAllDiscussionOfPractice,
} = require('../controllers/discussion.controllers');
const router = express.Router();

router.get(
    '/getAllDiscussionOfPractice/:practiceId',
    getAllDiscussionOfPractice
);

module.exports = router;
