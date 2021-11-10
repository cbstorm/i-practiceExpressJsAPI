const express = require('express');
const router = express.Router();
const {
    register,
    login,
    loginWithGoogle,
    refreshToken,
    forgotPassword,
    verifyCode,
    resetPassword,
} = require('../controllers/auth.controllers');
const { checkRefreshToken } = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/googleOauth', loginWithGoogle);
router.post('/forgotPassword/verifyCode/:email', verifyCode);
router.post('/forgotPassword/resetPassword/:email', resetPassword);

router.post('/forgotPassword', forgotPassword);
router.post('/refreshToken', checkRefreshToken, refreshToken);
module.exports = router;
