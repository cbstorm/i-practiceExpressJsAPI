const {
    FILE_NOT_SUPPORT,
    FILE_TOO_LARGE,
} = require('../constants/uploadImageErrorMessage.constant');
const fs = require('fs');

exports.validateUploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            const err = new Error('BAD_REQUEST');
            err.statusCode = 400;
            throw err;
        }
        const image = req.file.path;
        if (!image) {
            const err = new Error('BAD_REQUEST');
            err.statusCode = 400;
            throw err;
        }
        if (
            !req.file.mimetype.includes('jpeg') &&
            !req.file.mimetype.includes('png') &&
            !req.file.mimetype.includes('jpg')
        ) {
            fs.unlinkSync(req.file.path);
            const err = new Error(FILE_NOT_SUPPORT);
            err.statusCode = 400;
            throw err;
        }

        if (req.file.size > 1024 * 100) {
            fs.unlinkSync(req.file.path);
            const err = new Error(FILE_TOO_LARGE);
            err.statusCode = 400;
            throw err;
        }

        next();
    } catch (error) {
        next(error);
    }
};
