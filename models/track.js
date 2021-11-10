const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  ati: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model('track', trackSchema);
