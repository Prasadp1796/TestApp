var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
    QuestionNo: Number,
    QuestionText: String,
    OptionA: String,
    OptionB: String,
    OptionC: String,
    OptionD: String,
    Answer: String,
    TestID: String
});

module.exports = mongoose.model("questions", questionSchema);