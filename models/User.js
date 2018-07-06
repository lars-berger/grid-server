const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  fbUserId: {
    type: String,
    required: true
  },
  grids: [{
    type: Schema.Types.ObjectId,
    ref: 'Grids'
  }]
});