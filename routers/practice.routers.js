const express = require('express');
const {
    createPractice,
    getMyPractices,
    deletePractice,
    getSinglePractice,
    getNewestPracticeList,
    getUserPracticeList,
    getPracticeHaveQuestionList,
    getClassPracticeList,
} = require('../controllers/practice.controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/create', authMiddleware, createPractice);
router.get('/getmypractices', authMiddleware, getMyPractices);
router.get('/getNewestPracticeList', getNewestPracticeList);
router.get('/getUserPracticeList/:userId', getUserPracticeList);
router.get('/getClassPracticeList/:classId', getClassPracticeList);
router.get('/getSinglePractice/:practiceId', getSinglePractice);
router.get('/getPractice/:practiceId', getPracticeHaveQuestionList);
router.delete('/:practiceId', authMiddleware, deletePractice);
module.exports = router;
