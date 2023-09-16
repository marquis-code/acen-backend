"use strict";

const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
    full_name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reference : {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

paymentSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
paymentSchema.set("toJSON", {
    virtuals: true,
  });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
