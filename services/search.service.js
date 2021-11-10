const practiceSharings = require('../constants/practiceSharings.constant');
const { PracticeInfoDTO } = require('../dtos/Practice.dto');
const UserDTO = require('../dtos/User.dto');
const Practice = require('../models/Practice.model');
const User = require('../models/User.model');

exports.searchUsers = async (query) => {
    try {
        const users = await User.find({ $text: { $search: query } }).sort(
            '-createdAt'
        );
        if (users.length > 0) {
            return users.map((userItem) => new UserDTO(userItem));
        }
        return users;
    } catch (error) {
        throw error;
    }
};

exports.searchPractices = async (query) => {
    try {
        const practices = await Practice.find({
            sharing: practiceSharings.PUBLIC,
            $text: { $search: query },
        })
            .sort('-createdAt')
            .populate({ path: 'creator' });
        if (practices.length > 0) {
            return practices.map(
                (practiceItem) => new PracticeInfoDTO(practiceItem)
            );
        }
        return practices;
    } catch (error) {
        throw error;
    }
};
