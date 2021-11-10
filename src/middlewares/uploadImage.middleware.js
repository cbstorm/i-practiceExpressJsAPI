const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/');
    },
    filename: function (req, file, callback) {
        callback(
            null,
            'i-practice' +
                '-' +
                Date.now() +
                '.' +
                file.mimetype.slice(
                    file.mimetype.lastIndexOf('/') + 1,
                    file.mimetype.length
                )
        );
    },
});
const fileFilter = (req, file, callback) => {
    callback(null, true);
};

const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload.single('image');
