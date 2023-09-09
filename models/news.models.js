"use strict";

const mongoose = require('mongoose');
let newsSchema = mongoose.Schema({
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
  newsType: {
    type: String,
    required: true,
    enum : ['society-news', 'endocrinology-news']
  }
},{
    timestamps: true,
  });

  newsSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
  newsSchema.set("toJSON", {
    virtuals: true,
  });

  const News = mongoose.model("News", newsSchema);

  module.exports = News;