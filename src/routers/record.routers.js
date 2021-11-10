const express = require('express');
const {
    saveRecord,
    getRecordList,
} = require('../controllers/record.controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/saveRecord/:practiceId', authMiddleware, saveRecord);
router.get('/getRecordList/:practiceId', getRecordList);

module.exports = router;
