const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomDetailSchema = new Schema ({
    pricePerDay: {type: Number, require: true},
    type: {type: String, require: true},
    picture: [{type: String, require: true}],
    noOfPersons: {type: Number, require: true},
    status: {type:String, default: ""}
}, {timestamps: true});

module.exports = mongoose.model('RoomDetail', roomDetailSchema);