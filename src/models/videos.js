const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  categoria:{
    type: String,
    required: true
  },

  url:{
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Videos', videoSchema);