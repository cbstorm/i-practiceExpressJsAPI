const UserDTO = require('../dtos/User.dto');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const {
    PWD_NOT_CORRECT,
    LOGIN_BY_GOOGLE,
} = require('../constants/authErrorMessage.constant');

exports.getUserProfile = async (userId) => {
    try {
        const userProfile = await User.findById(userId);
        if (!userProfile) {
            const err = new Error('NOT_FOUND');
            err.statusCode = 404;
            throw err;
        }
        const userProfileData = new UserDTO(userProfile);
        return userProfileData;
    } catch (error) {
        throw error;
    }
};

exports.editAvatar = async (userId, image) => {
    try {
        const user = await User.findById(userId);
        const imagePath = `${process.env.HOST}:${process.env.PORT}/static/images/${image.filename}`;
        user.avatarUrl = imagePath;
        await user.save();
        return imagePath;
    } catch (error) {
        throw error;
    }
};

exports.changeName = async (userId, newName) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            const err = new Error('NOT_FOUND');
            err.statusCode = 404;
            throw err;
        }
        user.name = newName;
        await user.save();
    } catch (error) {
        throw error;
    }
};

exports.editPassword = async (userId, oldPassword, password) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            const err = new Error('NOT_FOUND');
            err.statusCode = 400;
            throw err;
        }
        if (user.loginMethod === 'google') {
            const err = new Error(LOGIN_BY_GOOGLE);
            err.statusCode = 400;
            throw err;
        }
        const matchingPassword = await bcrypt.compare(
            oldPassword,
            user.password
        );
        if (!matchingPassword) {
            const err = new Error(PWD_NOT_CORRECT);
            err.statusCode = 401;
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
