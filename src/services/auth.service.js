const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const UserDTO = require('../dtos/User.dto');
const {
    signAccessToken,
    signRefreshToken,
    decodeGoogleToken,
} = require('../config/jwt.config');
const {
    generateEmail,
    sendForgotPasswordEmail,
} = require('../config/nodemailer.config');
const {
    LOGIN_BY_GOOGLE,
    PWD_NOT_CORRECT,
    EMAIL_NOT_EXISTED,
    EMAIL_EXISTED,
    VERIFYCODE_NOT_CORRECT,
} = require('../constants/authErrorMessage.constant');

// Register Service
exports.register = async (name, email, password) => {
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        const err = new Error(EMAIL_EXISTED);
        err.statusCode = 400;
        throw err;
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: passwordHashed,
    });
    const userData = new UserDTO(user);
    const token = await signAccessToken({
        _id: userData._id,
        email: userData.email,
        name: userData.name,
    });
    const refreshToken = await signRefreshToken({
        _id: userData._id,
        email: userData.email,
        name: userData.name,
    });
    return { userData, token, refreshToken };
};

// Login Service
exports.login = async (email, password) => {
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
        const err = new Error(EMAIL_NOT_EXISTED);
        err.statusCode = 400;
        throw err;
    }
    if (existedUser.loginMethod === 'google') {
        const err = new Error(LOGIN_BY_GOOGLE);
        err.statusCode = 400;
        throw err;
    }
    const matchingPassword = await bcrypt.compare(
        password,
        existedUser.password
    );
    if (!matchingPassword) {
        const err = new Error(PWD_NOT_CORRECT);
        err.statusCode = 401;
        throw err;
    }
    const userData = new UserDTO(existedUser);
    const token = await signAccessToken({
        _id: userData._id,
        email: userData.email,
        name: userData.name,
        avatarUrl: userData.avatarUrl,
    });
    const refreshToken = await signRefreshToken({
        _id: userData._id,
        email: userData.email,
        name: userData.name,
    });
    return { userData, token, refreshToken };
};

// Login With Google Service
exports.loginWithGoogle = async (googleToken) => {
    const data = decodeGoogleToken(googleToken);
    const { email, picture, name } = data;
    const existUser = await User.findOne({ email });
    if (existUser) {
        if (existUser.loginMethod !== 'google') {
            existUser.loginMethod = 'google';
            existUser.password = undefined;
            await existUser.save();
        }
        const userData = new UserDTO(existUser);
        const token = await signAccessToken({
            _id: userData._id,
            email: userData.email,
            name: userData.name,
            avatarUrl: userData.avatarUrl,
        });
        const refreshToken = await signRefreshToken({
            _id: userData._id,
            email: userData.email,
            name: userData.name,
            avatarUrl: userData.avatarUrl,
        });
        return { userData, token, refreshToken };
    }
    const user = await User.create({
        email,
        name,
        avatarUrl: picture,
        loginMethod: 'google',
    });
    const userData = new UserDTO(user);
    const token = await signAccessToken({
        _id: userData._id,
        email: userData.email,
        name: userData.name,
        avatarUrl: userData.avatarUrl,
    });
    const refreshToken = await signRefreshToken({
        _id: userData._id,
        email: userData.email,
        name: userData.name,
        avatarUrl: userData.avatarUrl,
    });
    return { userData, token, refreshToken };
};

// Refresh Token Service
exports.refreshToken = async (user) => {
    const token = await signAccessToken({
        ...user,
    });
    const refreshToken = await signRefreshToken({
        ...user,
    });
    return { token, refreshToken };
};

// Forgot Password Service
exports.forgotPassword = async (email) => {
    try {
        const { verifyCode, mailOptions } = generateEmail(email);
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error(EMAIL_NOT_EXISTED);
            err.statusCode = 404;
            throw err;
        }
        if (user.loginMethod === 'google') {
            const err = new Error(LOGIN_BY_GOOGLE);
            err.statusCode = 400;
            throw err;
        }
        user.verifyCode = verifyCode;
        await user.save();
        const result = await sendForgotPasswordEmail(mailOptions);
        return result;
    } catch (error) {
        throw error;
    }
};

exports.verifyCode = async (email, verifyCode) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error(EMAIL_NOT_EXISTED);
            err.statusCode = 404;
            throw err;
        }
        if (!user.verifyCode) {
            const err = new Error('NOT_FOUND');
            err.statusCode = 400;
            throw err;
        }
        if (user.verifyCode !== verifyCode) {
            const err = new Error(VERIFYCODE_NOT_CORRECT);
            err.statusCode = 400;
            throw err;
        }
        user.verifyCode = undefined;
        await user.save();
    } catch (error) {
        throw error;
    }
};

exports.resetPassword = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error(EMAIL_NOT_EXISTED);
            err.statusCode = 404;
            throw err;
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        user.password = passwordHashed;
        await user.save();
    } catch (error) {
        throw error;
    }
};
