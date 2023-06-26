const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    isCompany: { type: Boolean, required: true }
});

module.exports = mongoose.model('User', noteSchema);
