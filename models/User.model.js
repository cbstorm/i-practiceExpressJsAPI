const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Name is required'],
            minlength: [5, 'Name must have at least 5 characters'],
            maxlength: [20, 'Name must have maximum 20 characters'],
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: 'Email address is required',
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },
        avatarUrl: {
            type: String,
            default: '',
        },
        password: {
            type: String,
            minlength: [6, 'Password must have at least 6 characters'],
        },
        loginMethod: {
            type: String,
            enum: ['local', 'google', 'facebook'],
            default: 'local',
        },
        verifyCode: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
