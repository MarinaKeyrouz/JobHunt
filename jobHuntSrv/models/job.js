const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    appliedUsers: { type: Array, required: true },
});

module.exports = mongoose.model('Job', jobSchema);
