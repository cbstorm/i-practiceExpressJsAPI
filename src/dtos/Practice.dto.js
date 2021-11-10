const UserDTO = require('./User.dto');

function PracticeInfoDTO(practiceData) {
    this._id = practiceData._id;
    this.title = practiceData.title;
    this.category = practiceData.category;
    this.level = practiceData.level;
    this.limitTime = practiceData.limitTime;
    this.timeLimited = practiceData.timeLimited;
    this.creator = new UserDTO(practiceData.creator);
    this.questionsAmount = practiceData.questionList.length;
}

function PracticeHaveQuestionListDTO(practiceData) {
    this._id = practiceData._id;
    this.limitTime = practiceData.limitTime;
    this.timeLimited = practiceData.timeLimited;
    this.questionList = practiceData.questionList;
}

module.exports = {
    PracticeInfoDTO,
    PracticeHaveQuestionListDTO,
};
