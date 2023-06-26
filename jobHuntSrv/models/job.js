const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    _id: {type: Number, required: true},
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    date: string = { type: String, required: true }
});

module.exports = mongoose.model('Job', jobSchema);
