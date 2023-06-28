const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    isCompany: { type: Boolean, required: true },
    appliedJobs: { type: Array, required: true },
    cv: { type: Buffer },
});

module.exports = mongoose.model('User', userSchema);
