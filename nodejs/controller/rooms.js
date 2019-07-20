const Rooms = require('../models/rooms');
function statusCode400(res) {
    res.status(400).send({
        status: 400,
        message: "Some parameter missing.!"
    });
}
const actions = {};
var multer = require('multer');


actions.addRooms = function (req, res) {
    let data = {};
    if (!req.body && !req.body.pricePerDay && !req.body.type && !req.body.noOfPersons) {
        statusCode400(res);
    } else {
        data = {
            pricePerDay: req.body.pricePerDay,
            type: req.body.type,
            noOfPersons: req.body.noOfPersons,
            status: "Not Book"
        }
        Rooms.create(data, function (error, response) {
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

actions.getRoomDetail = function (req, res) {
    let id = req.query.id;
    if (id) {
        Rooms.findById({ _id: id }, function (error, response) {
            if (error) {
                res.status(404).send({
                    status: 404,
                    Success: false,
                    Message: "Something Went Wromg. Please try later!"
                })
            } else {
                if (response) {
                    res.send({
                        Success: true,
                        Message: response
                    });
                } else {
                    res.send({
                        Success: true,
                        Message: "Data not found.",
                    });
                }
            }
        })
    } else {
        Rooms.find({}, function (error_, response_) {
            if (error_) {
                res.status(404).send({
                    status: 404,
                    Success: false,
                    Message: "Something Went Wromg. Please try later!"
                })
            } else {
                if (response_) {
                    res.send({
                        Success: true,
                        Message: response_
                    });
                } else {
                    res.send({
                        Success: true,
                        Message: "Data not found.",
                    });
                }
            }
        })
    }
}

actions.updateRoomDetail = function (req, res) {
    let id = req.query.id;
    if (id === '') {
        statusCode400(res);
    } else {
        Rooms.updateOne({ _id: id }, {
            $set: {
                pricePerDay: req.body.pricePerDay,
                type: req.body.type,
                noOfPersons: req.body.noOfPersons,
                status: req.body.status
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
    }
}

actions.deleteRoomDetail = function (req, res) {
    let id = req.query.id;
    if (id === '') {
        statusCode400(res);
    } else {
        Rooms.deleteOne({ _id: id }, function (error, response) {
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
/**----For images on specific room id---- */
actions.createUpload = function (req, res) {
    var id = req.body.id;
    var files;
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        }, filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        }
    });
    var upload = multer({ storage: storage });
    upload.array('myFiles', 10), function (req, res, next) {
        files = req.files;
        if (!files) {
            const error = new Error('Please choose files')
            error.httpStatusCode = 400
            return next(error)
        }
    }
    if (id) {
        Rooms.findById({ _id: id }, function (error, response) {
            if (error) {
                res.status(404).send({
                    status: 404,
                    Success: false,
                    Message: "Something Went Wromg. Please try later!"
                })
            } else {
                Rooms.create({ picture: files }, function (error_, response_) {
                    if (error_) {

                    } else {
                        res.send({
                            Success: true,
                            Message: response,
                        });
                    }
                })
            }
        })
    } else {
        statusCode400(res);
    }
}

actions.deleteUpload = function (req, res) {
    const id = req.body.id;
    const filenName = req.files;
    const query = { _id: id, picture: filenName };
    if (id) {
        Rooms.deleteOne(query, function (error, response) {
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