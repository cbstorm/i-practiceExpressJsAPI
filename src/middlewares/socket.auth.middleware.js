const { verifyAccessToken } = require('../config/jwt.config');

exports.socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) {
            const err = new Error('TOKEN_NOT_FOUND');
            next(err);
        }
        const user = await verifyAccessToken(token);
        socket.user = user;
        socket.join(user._id);
        next();
    } catch (error) {
        const err = new Error('UNAUTHORIZED');
        next(err);
    }
};
