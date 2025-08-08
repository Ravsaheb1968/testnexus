const mongoose = require('mongoose');

const SuiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  functionAreas: [{ type: String }] // if you want to track areas too
});

module.exports = mongoose.model('Suite', SuiteSchema);
