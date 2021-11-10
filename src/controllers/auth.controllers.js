const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const {
    signRefreshToken,
    signAccessToken,
    decodeGoogleToken,
} = require('../config/jwt.config');
const UserDTO = require('../dtos/User.dto');
const authService = require('../services/auth.service');
const responseStatus = require('../constants/responseStatus.constant');
// Handle Register
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const { userData, token, refreshToken } = await authService.register(
            name,
            email,
            password
        );

        res.set({
            Token: token,
            RefreshToken: refreshToken,
        });
        return res
            .status(201)
            .json({ status: responseStatus.SUCCESS, data: userData });
    } catch (error) {
        next(error);
    }
};

// Handle Login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { userData, token, refreshToken } = await authService.login(
            email,
            password
        );
        res.set({
            Token: token,
            RefreshToken: refreshToken,
        });
        return res
            .status(200)
            .json({ status: responseStatus.SUCCESS, data: userData });
    } catch (error) {
        next(error);
    }
};

//Handle Login with Google

exports.loginWithGoogle = async (req, res, next) => {
    try {
        const { googleToken } = req.body;
        const { userData, token, refreshToken } =
            await authService.loginWithGoogle(googleToken);
        res.set({
            Token: token,
            RefreshToken: refreshToken,
        });
        return res
            .status(201)
            .json({ status: responseStatus.SUCCESS, data: userData });
    } catch (error) {
        next(error);
    }
};

// Handle Refresh Token
exports.refreshToken = async (req, res, next) => {
    try {
        const user = req.user;
        const { token, refreshToken } = await authService.refreshToken(user);
        res.set({
            Token: token,
            RefreshToken: refreshToken,
        });
        return res.status(200).json({ status: responseStatus.SUCCESS });
    } catch (error) {
        next(error);
    }
};

// Handle Forgot Password

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        console.log(email);
        const result = await authService.forgotPassword(email);
        return res
            .status(200)
            .json({ status: responseStatus.SUCCESS, data: result });
    } catch (error) {
        next(error);
    }
};

exports.verifyCode = async (req, res, next) => {
    try {
        const { email } = req.params;
        const { verifyCode } = req.body;
        await authService.verifyCode(email, verifyCode);
        return res.status(200).json({ status: responseStatus.SUCCESS });
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { email } = req.params;
        const { password } = req.body;
        await authService.resetPassword(email, password);
        return res.status(200).json({ status: responseStatus.SUCCESS });
    } catch (error) {
        next(error);
    }
};
