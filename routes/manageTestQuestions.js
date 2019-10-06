var router = require('express').Router();

var testSchema = require('../Schema/testSchema');

router.get('/manageTest/:testId', function (req, res) {
    testSchema.findOne({_id: req.params.testId}, function (err, test) {
        if(err)
            throw err;
        else
            res.render("ManageTestQuestions/index", {Test: test});
    })
});
module.exports = router;