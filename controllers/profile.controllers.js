const { response } = require('express');
const responseStatus = require('../constants/responseStatus.constant');
const profileService = require('../services/profile.service');

exports.editAvatar = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const image = req.file;
        const newAvatarUrl = await profileService.editAvatar(_id, image);
        return res
            .status(200)
            .json({ status: responseStatus.SUCCESS, data: newAvatarUrl });
    } catch (error) {
        next(error);
    }
};

exports.changeName = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { name } = req.body;
        await profileService.changeName(_id, name);
        return res.status(200).json({ status: responseStatus.SUCCESS });
    } catch (error) {
        next(error);
    }
};

exports.editPassword = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { oldPassword, password } = req.body;
        await profileService.editPassword(_id, oldPassword, password);
        return res.status(200).json({ status: responseStatus.SUCCESS });
    } catch (error) {
        next(error);
    }
};

exports.getUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userProfileData = await profileService.getUserProfile(userId);
        return res
            .status(200)
            .json({ status: 'success', data: userProfileData });
    } catch (error) {
        next(error);
    }
};
