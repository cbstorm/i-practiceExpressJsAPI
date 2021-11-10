const express = require('express');
const {
    getUserProfile,
    editAvatar,
    changeName,
    editPassword,
} = require('../controllers/profile.controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();
const uploadImageMiddleware = require('../middlewares/uploadImage.middleware');
const {
    validateUploadImage,
} = require('../middlewares/validateUploadImage.middleware');

router.put(
    '/edit/avatar/',
    authMiddleware,
    uploadImageMiddleware,
    validateUploadImage,
    editAvatar
);
router.put('/edit/changeName', authMiddleware, changeName);
router.put('/edit/password/', authMiddleware, editPassword);
router.get('/getUserProfile/:userId', getUserProfile);

module.exports = router;
