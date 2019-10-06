var mongoose = require('mongoose');

let testSchema = mongoose.Schema({
    TestName: {type: String, unique: true},
    NoOfQuestions: Number
});

module.exports = mongoose.model('tests', testSchema);