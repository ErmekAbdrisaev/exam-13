const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  title: String,
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  image:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
});

const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;