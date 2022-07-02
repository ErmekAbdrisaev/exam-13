const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
    required: true,

  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,

  },
  foodQlty: Number,
  serviceQlty: Number,
  interiorQlty: Number,
  description: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;