"use strict";

const mongoose = require('mongoose');
let publicationSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  co_editors : {
    type: String,
    required: true
  },
  member_benefits: {
    type: String,
    required: true
  },
  publication_url: {
    type: String,
    required: true
  }
},{
    timestamps: true,
  });

  publicationSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
  publicationSchema.set("toJSON", {
    virtuals: true,
  });

  const Publications = mongoose.model("Publication", publicationSchema);

  module.exports = Publications;