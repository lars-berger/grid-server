const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grid = new Schema({
  url: {    // identifies the grid (grid.tv/:url)
    type: String,
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