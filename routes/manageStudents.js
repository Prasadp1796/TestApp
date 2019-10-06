var router = require('express').Router();

const {check, validationResult} = require('express-validator');

var isLoggedIn = require('../lib/isLoggedIn');


//Student Schema Imported Here
var studentSchema = require('../Schema/studentSchema');

//Method To Render Manage Students Page
router.get('/manageStudents', isLoggedIn, function (req, res) {
    res.render('ManageStudents/index');
});

//Method To Get Students Data
router.get('/getStudents', function (req, res) {
    studentSchema.find(function (err, students) {
        if (err)
            res.sendStatus(500);
        else
            res.send(students);
    })
});

//Method To Get Student Details By _id
router.get('/getStudentInfo', function (req, res) {
    studentSchema.findOne({_id: req.query.StudentID}, function (err, student) {
        if (err)
            res.sendStatus(500);
        else
            res.send(student);
    });
});

//Method To Delete Student
router.get('/deleteStudent', function (req, res) {
    studentSchema.findOneAndRemove({_id: req.query.StudentID}, function (err) {
        if (err)
            res.sendStatus(500);
        else
            res.sendStatus(200);
    })
});


//Method To Create New Student
router.post('/createNewStudent', isLoggedIn, function (req, res) {
    var newStudent = new studentSchema(req.body);
    newStudent.save(function (err) {
        if (err)
            res.sendStatus(500);
        else
            res.sendStatus(201);
    });
});

//MEthod To Update Student Details 
router.post('/editStudent', isLoggedIn, function (req, res) {
    studentSchema.findOneAndUpdate({_id: req.body._id}, {$set: req.body}, function (err) {
        if (err) {
            res.sendStatus(500);
        }

        else
            res.sendStatus(201);
    })
});


//Method To Update Student Details
module.exports = router;