const { RecordDTO } = require('../dtos/Record.dto');
const Record = require('../models/Record.model');

exports.saveRecord = async (_id, practiceId, avgRatio) => {
    const recordExisted = await Record.findOne({ user: _id, practiceId });
    if (recordExisted) {
        recordExisted.count += 1;
        recordExisted.avgRatio = Math.floor(
            (recordExisted.avgRatio + avgRatio) / 2
        );
        await recordExisted.save();
        return;
    }
    await Record.create({
        user: _id,
        practiceId,
        avgRatio,
    });
    return;
};

exports.getRecordList = async (practiceId, page, limit) => {
    if (!page) {
        page = 0;
    }
    if (!limit) {
        limit = 5;
    }
    let limitInt = parseInt(limit);
    let skip = parseInt(page) * limitInt;
    const records = await Record.find({ practiceId })
        .sort('-avgRatio')
        .skip(skip)
        .limit(limitInt)
        .populate('user');
    if (records.length > 0) {
        const recordsData = records.map((record) => {
            return new RecordDTO(record);
        });
        return recordsData;
    }
    return records;
};
