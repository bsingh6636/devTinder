const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 4
    },
    lastName: {
        type: String,
        maxLength: 6
    },
    emailId: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        validate(value) {
            if (!['male', 'female'].includes(value)) throw new Error('others now allowed')
        }
    },
    age: {
        type: Number,
        min: 18,
        default: 18
    },

    country: {
        type: String
    },
    skills: Array
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);


