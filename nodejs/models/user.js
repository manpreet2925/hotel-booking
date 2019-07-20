const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDetailSchema = new Schema ({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    mobileNo: {type: Number, require: true},
    accessToken: {type: String, require: true}
}, {timestamps: true});

module.exports = mongoose.model('UserDetail', userDetailSchema);