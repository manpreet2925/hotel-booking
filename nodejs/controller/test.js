const test = require('../models/test');
const actions = {};

actions.sample = function(req, res) {
    console.log('hello world');
    test.create({name: req.body.name}, function(error, response) {   
        if(error){
            res.json({
                Success: false,
                data: "Something went wrong. Please try later."
            })   
        } else{
            res.json({
                Success: true,
                data: response
            })
        }
    })
}
module.exports = actions;