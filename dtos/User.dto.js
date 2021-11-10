function UserDTO(userData) {
    this.name = userData.name;
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this._id = userData._id;
    this.loginMethod = userData.loginMethod;
}
module.exports = UserDTO;
