const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    practiceId: {
        type: Schema.Types.ObjectId,
    },
    count: {
        type: Number,
        default: 1,
    },
    avgRatio: {
        type: Number,
        default: 0,
    },
});

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;
