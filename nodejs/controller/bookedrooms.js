const BookedRoom = require('../models/bookedRooms');
const actions = {};
function statusCode400(res) {
    res.status(400).send({
        status: 400,
        message: "Some parameter missing.!"
    });
}

actions.createBooking = function (req, res) {
    var userId = req.body.userId;
    var roomId = req.body.roomId;
    var noOfPersons = req.body.noOfPersons;
    var days = req.body.days;
    if (userId != '' && roomId != '' && noOfPersons != '' && days != '') {
        BookedRoom.create({
            userId: userId,
            roomId: roomId,
            noOfPersons: noOfPersons,
            days: days,
            status: "Please wait for approval."
        }, function (error, response) {
            if (error) {
                console.log('check error-->', error);
                res.status(404).send({
                    status: 404,
                    Success: false,
                    Message: "Something Went Wromg. Please try later!"
                })
            } else {
                res.send({
                    Success: true,
                    Message: response,
                });
            }
        })
    } else {
        console.log('check');
        statusCode400(res);
    }
}

actions.updateBooking = function (req, res) {
    var userId = req.body.userId;
    var roomId = req.body.roomId;
    var noOfPersons = req.body.noOfPersons;
    var days = req.body.days;
    if (userId != '' && roomId != '' && noOfPersons != '' && days != '') {
        BookedRoom.updateOne({ userId: userId }, {
            $set: {
                roomId: roomId,
                noOfPersons: noOfPersons,
                days: days,
                status: "Please wait for approval."
            }
        }, function (error, response) {
            if (error) {
                res.status(404).send({
                    status: 404,
                    Success: false,
                    Message: "Something Went Wromg. Please try later!"
                })
            } else {
                res.send({
                    Success: true,
                    Message: response,
                });
            }
        })
    } else {
        statusCode400(res);
    }
}

actions.checkBooking = function (req, res) {
    var userId = req.query.userId;
    var roomId = req.query.roomId;
    var id = req.query.id
    if (userId != '' && roomId != '' && id != '') {
        BookedRoom.findById({ _id: id }).populate(userId).populate(roomId).exec(function (error, response) {
            if (error) {
                res.status(404).send({
                    status: 404,
                    Success: false,
                    Message: "Something Went Wromg. Please try later!"
                })
            } else {
                res.send({
                    Success: true,
                    Message: response,
                });
            }
        })
    } else {
        statusCode400(res);
    }
}

actions.deleteBooking = function (req, res) {
    var userId = req.body.userId;
    var roomId = req.body.roomId;
    var noOfPersons = req.body.noOfPersons;
    var days = req.body.days;
    if (userId != '' && roomId != '' && noOfPersons != '' && days != '') {
        BookedRoom.deleteOne({ _id: id }, function (error, response) {
            if (error) {
                res.status(404).send({
                    status: 404,
                    Success: false,
                    Message: "Something Went Wromg. Please try later!"
                })
            } else {
                res.send({
                    Success: true,
                    Message: response,
                });
            }
        })
    } else {
        statusCode400(res);
    }
}

module.exports = actions;