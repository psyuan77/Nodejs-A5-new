const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  message: { 
    type: String, 
    required: true 
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewUser',
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Contact', contactSchema);
