const bcrypt = require('bcrypt');
const saltRounds = 8;
var salt = bcrypt.genSaltSync(saltRounds);
const uuidv1 = require('uuid/v1');
const User = require('../models/user');
const actions = {};
/**----res status code 400---- */
function statusCode400(res) {
    res.status(400).send({
        status: 400,
        message: "Invalid data format or Some parameter missing.!"
    });
}
/**----chekc email format---- */
function checkEmail(email, res) {
    var regex = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
    if (!regex.test(email)) statusCode400(res);
    else return true;
}
/**-----create user-----*/
actions.createUser = function (req, res) {
    var data = {};
    /**-----validations----- */
    if (req.body.firstName == '' && req.body.lastName == '' && req.body.password == '' && req.body.mobileNo == '' && req.body.email == '') {
        statusCode400(res);
    } else {
        checkEmail(req.body.email, res);
        var pass = bcrypt.hashSync(req.body.password, salt);
        data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNo: req.body.mobileNo,
            email: req.body.email,
            password: pass,
        };
        User.find({ email: data.email }, function (error, response) {
            if (error) {
                res.status(404).send({
                    status: 404,
                    Success: false,
                    Message: "Something Went Wromg. Please try later!"
                })
            } else {
                /**---send response email is already registerd---- */
                console.log(response);
                if (response[0] && response[0].email) {
                    res.send({
                        Success: true,
                        Message: "Email is already exist. Please try another email! ",
                        Data: response
                    })
                } else {
                    User.create(data, function (error_, response_) {
                        if (error_) {
                            console.log('error', error_)
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
            }
        })
    }
}

/**signin user */
actions.userSignIn = function (req, res) {
    let data = {};
    if (req.body.email === '' && req.body.password === '') {
        statusCode400(res);
    } else {
        data = {
            email: req.query.email,
            password: req.query.password
        }
        User.find(data, function (error, response) {
            if (error) {
                res.status(404).send({
                    status: 404,
                    Success: false,
                    Message: "Something Went Wromg. Please try later!"
                })
            } else {
                console.log('check data', response);
                /**----send response valid user---- */
                res.send({
                    Success: true,
                    Message: response,
                });
            }
        })
    }
}

actions.userUpdate = function (req, res) {
    let id = req.query.id;
    var pass = bcrypt.hashSync(req.body.password, salt);
    User.updateOne({ _id: id }, {
        $set: {
            password: pass,
            mobileNo: req.body.mobileNo,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }
    }, function (err, response) {
        if (err) {
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

actions.userDelete = function (req, res) {
    let id = req.query.id;
    User.deleteOne({ _id: id }, function (err, response) {
        if (err) {
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
module.exports = actions;