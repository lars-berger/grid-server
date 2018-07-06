const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grid = new Schema({
  videos: [{
    url: {    // identifies the grid (grid.tv/:url)
      type: String,
      required: true
    },
    linkURL: {
      type: String,   //link to stream
      required: true
    }
  }]
});