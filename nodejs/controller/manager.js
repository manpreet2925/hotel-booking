const bcrypt = require('bcrypt');
const saltRounds = 8;
var salt = bcrypt.genSaltSync(saltRounds);
/**----status code 400---- */
function statusCode400(res) {
    res.status(400).send({
        status: 400,
        message: "Some parameter missing.!"
    });
}
const BookedRoom = require('../models/bookedRooms');
const Manager = require('../models/manager');
const actions = {};
/**----Create Manager---- */
actions.createManager = function (req, res) {
    var data = {};
    if (req.body.managerUserName === '' && req.body.password === '') {
        statusCode400(res);
    } else {
        var pass = bcrypt.hashSync(req.body.password, salt);
        data = {
            managerUserName: req.body.managerUserName,
            password: pass
        };
        Manager.create(data, function (error, response) {
            if (error) {
                console.log('error', error);
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
    }
}

/**-----Signin by manager----- */
actions.getManager = function (req, res) {
    let data = {};
    if (req.query.managerUserName === " " && req.query.password === " ") {
        statusCode400(res);
    } else {
        data = {
            managerUserName: req.query.managerUserName,
            password: req.query.password
        };
        Manager.find(data, function (error, response) {
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
    }
}

/***----Update status acceptance or rejection----- */
actions.updateStatus = function (req, res) {
    const id = req.body.id;
    if (id) {
        Manager.findById({ _id: id }, function (error, response) {
            if (error) {
                res.status(404).send({
                    status: 404,
                    Success: false,
                    Message: "Something Went Wromg. Please try later!"
                })
            } else {
                BookedRoom.updateOne({ _id: req.body.bookRoomId }, { $set: { status: req.body.status } }, function (error_, response_) {
                    if (error_) {
                        res.status(404).send({
                            status: 404,
                            Success: false,
                            Message: "Something Went Wromg. Please try later!"
                        })
                    } else {
                        res.send({
                            Success: true,
                            Message: response_,
                        });
                    }
                })
            }
        })
    } else {
        statusCode400(res);
    }
}
module.exports = actions;