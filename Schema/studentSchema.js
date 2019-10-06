var mongoose = require('mongoose');

let studentSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Password: String,
    EmailID: {type: String, unique: true, sparse: true},
    Contact: {type: String, unique: true, sparse: true}
});

module.exports = mongoose.model('students', studentSchema);