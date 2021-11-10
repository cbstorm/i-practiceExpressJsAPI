const { RecordDTO } = require('../dtos/Record.dto');
const Record = require('../models/Record.model');
const recordService = require('../services/record.service');

exports.saveRecord = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { practiceId } = req.params;
        const { avgRatio } = req.body;
        await recordService.saveRecord(_id, practiceId, avgRatio);
        return res.status(200).json({ status: 'success' });
    } catch (error) {
        next(error);
    }
};

exports.getRecordList = async (req, res, next) => {
    try {
        const { practiceId } = req.params;
        let { page, limit } = req.query;
        const records = await recordService.getRecordList(
            practiceId,
            page,
            limit
        );
        return res.status(200).json({ status: 'success', data: records });
    } catch (error) {
        next(error);
    }
};
