const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerSchema = new Schema ({
    managerUserName: {type: String, require: true},
    password: {type: String, require: true},
}, {timestamps: true});

module.exports = mongoose.model('ManagerDetail', managerSchema);