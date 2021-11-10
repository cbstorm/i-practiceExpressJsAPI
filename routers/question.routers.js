const express = require('express');
const { getQuestionList } = require('../controllers/question.controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/getQuestionList/:practiceId', authMiddleware, getQuestionList);

module.exports = router;
