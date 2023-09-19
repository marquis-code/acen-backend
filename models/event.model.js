"use strict";

const mongoose = require('mongoose');
let eventSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum : ['Training', 'Event']
  },
  attendanceType: {
    type: String,
    required: true,
    enum : ['Online only', 'Hybrid', 'In person only']
  },
  topic: {
    type: String,
    required: true,
    enum : ['Neuroendocrinology', 'Obesity', 'Diabetes', 'Endocrine-Related Cancer', 'Adrenal', 'Metaabolism', 'Cardiovascular', 'Bone', 'Endocrine-Disrupting Chemicals', 'Reproduction', 'Steroid and Steroidogenesis', 'Thyroid']
  },
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  date:{
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
},{
    timestamps: true,
  });

  eventSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
  eventSchema.set("toJSON", {
    virtuals: true,
  });

  const Events = mongoose.model("Events", eventSchema);

  module.exports = Events;