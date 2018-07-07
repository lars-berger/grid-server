const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grid = new Schema({
  name: {
    type: String,
    required: true
  },
  URL: {
    type: String,   //link to stream
    required: true
  },
  videos: [{
    type: {
      type: String,   //twitch, fb, yt
      require: true
    },
    linkURL: {
      type: String,   //link to stream
      required: true
    }
  }],
  //statistics: visitors/watching
});
module.exports = mongoose.model('Grid',Grid);