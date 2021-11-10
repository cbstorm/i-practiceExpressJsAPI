const {
    verifyAccessToken,
    verifyRefreshToken,
} = require('../config/jwt.config');

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
        const user = {
            _id: decoded._id,
            name: decoded.name,
            email: decoded.email,
            avatarUrl: decoded.avatarUrl,
        };
        if (!user) {
            const err = new Error('INVALID_REFRESH_TOKEN');
            err.statusCode = 403;
            throw err;
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
