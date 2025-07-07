const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: Number,
  price: Number
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
