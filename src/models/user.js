const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },

    country : {
        type : String
    }
})

module.exports = mongoose.model('User', UserSchema);


