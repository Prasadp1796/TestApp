var router = require('express').Router();

const {check, validationResult} = require('express-validator');

var isLoggedIn = require('../lib/isLoggedIn');


//Test Schema Imported Here
var testSchema = require('../Schema/testSchema');

//Method To Render Manage Tests Page
router.get('/manageTests', isLoggedIn, function (req, res) {
    res.render('ManageTests/index');
});

//Method To Get Tests Data
router.get('/getTests', function (req, res) {
    testSchema.find(function (err, tests) {
        if (err)
            res.sendStatus(500);
        else
            res.send(tests);
    })
});

//Method To Get Test Details By _id
router.get('/getTestInfo', function (req, res) {
    testSchema.findOne({_id: req.query.TestID}, function (err, test) {
        if (err)
            res.sendStatus(500);
        else
            res.send(test);
    });
});

//Method To Delete Test
router.get('/deleteTest', function (req, res) {
    testSchema.findOneAndRemove({_id: req.query.TestID}, function (err) {
        if (err)
            res.sendStatus(500);
        else
            res.sendStatus(200);
    })
});


//Method To Create New Test
router.post('/createNewTest', isLoggedIn, function (req, res) {
    var newTest = new testSchema(req.body);
    newTest.save(function (err) {
        if (err)
            res.sendStatus(500);
        else
            res.sendStatus(201);
    });
});

//MEthod To Update Test Details
router.post('/editTest', isLoggedIn, function (req, res) {
    testSchema.findOneAndUpdate({_id: req.body._id}, {$set: req.body}, function (err) {
        if (err) {
            res.sendStatus(500);
        }

        else
            res.sendStatus(201);
    })
});


//Method To Update Test Details
module.exports = router;