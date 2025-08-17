// models/TestCase.js
const mongoose = require('mongoose');

const TestCaseSchema = new mongoose.Schema({
  automationSuite: {
    type: String, // store suite name for easy query
    required: true
  },
  functionArea: {
    type: String,
    required: true
  },
  name: { 
    type: String, 
    required: true 
  },
  execution: {
    assigned_user: { type: String, default: '' },
    machine_name: { type: String, default: '' },
    status: { 
      type: String, 
      enum: ['Not Run', 'In-Progress', 'Passed', 'Failed', 'Blocked'], 
      default: 'Not Run' 
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('TestCase', TestCaseSchema);
