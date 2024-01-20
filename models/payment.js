const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  memberId: {
    type: String,
    required: true
  },
  paymentRef: {
    type: String,
    required: true
  },
  amount:  {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);