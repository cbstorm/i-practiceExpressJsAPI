const UserDTO = require('./User.dto');

function RecordDTO(record) {
    this.user = new UserDTO(record.user);
    this.count = record.count;
    this.avgRatio = record.avgRatio;
}

module.exports = {
    RecordDTO,
};
