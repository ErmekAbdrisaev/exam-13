const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  title: String,
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image:{
    type: String,
    required: true
  },
  description: String,
  isAgree: Boolean,
});

const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;