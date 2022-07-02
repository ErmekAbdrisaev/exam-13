const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  place: {
    type: String,
    ref: 'Place',
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  image: String,
});

const Picture = mongoose.model('Picture', PictureSchema);
module.exports = Picture;