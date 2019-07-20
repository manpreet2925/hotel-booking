const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomsSchema = new Schema ({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'UserDetail'},
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'RoomDetail'},
    status: {type:String, default: ''},
    days: {type:Number, require: true},
    noOfPersons: {type: Number, require: true}
}, {timestamps: true});

module.exports = mongoose.model('BookedRoomDetail', roomsSchema);