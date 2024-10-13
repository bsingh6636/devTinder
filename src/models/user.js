const mongoose = require('mongoose');
const validator = require('validator');

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
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Email is invalid')
        }
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

    photoUrl: {
        type: String,
        default: 'https://res.cloudinary.com/bsingh6636/image/upload/v1723648948/myPhoto/pp_photo_Brijesh_vcop2n.jpg',
        validate(value) {
            if (!validator.isURL(value)) throw new Error('url is invalid')
        }
    },
    skills: {
        type: Array,
        validate(value) {
            if (value.length > 10) throw new Error(`skils set can't be more than 10`)
        }

    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);


