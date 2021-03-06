const {
    verifyAccessToken,
    verifyRefreshToken,
} = require('../config/jwt.config');
const User = require('../models/User.model');

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            const err = new Error('TOKEN_NOT_FOUND');
            err.statusCode = 400;
            throw err;
        }
        const user = await verifyAccessToken(token);
        req.user = user;
        next();
    } catch (error) {
        const err = new Error(error.message);
        err.statusCode = 401;
        next(err);
    }
};
exports.checkRefreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            const err = new Error('REFRESH_TOKEN_NOT_FOUND');
            err.statusCode = 401;
            throw err;
        }
        const decoded = await verifyRefreshToken(refreshToken);
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            const err = new Error('USER_NOT_EXIST');
            err.statusCode = 400;
            throw err;
        }
        const userData = {
            _id: decoded._id,
            name: decoded.name,
            email: decoded.email,
            avatarUrl: decoded.avatarUrl,
        };
        req.user = userData;
        next();
    } catch (error) {
        next(error);
    }
};
