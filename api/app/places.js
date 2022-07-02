const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const auth = require("../middlewear/auth");
const permit = require("../middlewear/permit");
const Place = require("../models/Place");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
  try {
    const query = {};

    if (req.query.filter === 'image') {
      query.image = {$ne: null};
    }

    // if (req.query.places) {
    //   const placesId = await Place.find({user: {_id: req.query.user}}).populate('user', 'displayName');
    //   return res.send(placesId);
    // }

    if(req.query.user){
      query.user = {_id: req.query.user}
    }

    const places = await Place.find(query).populate('user','displayName');
    return res.send(places);
  } catch (e) {
    next(e);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).send({message: "Not found"});
    }
    return res.send(place);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, permit('admin', 'user'), upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.user) {
      return res.status(404).send({message: "Not found!"});
    }

    const placeData = {
      user: req.body.artist,
      title: req.body.title,
      review: req.body.review,
      image: null,
      description: req.body.description,
      isUnderstand: false
    };

    if (req.file) {
      placeData.image = req.file.filename;
    }

    if (req.user.role === 'admin') {
      placeData.isUnderstand = true;
    }

    const place = new Place(placeData);
    await place.save();
    return res.send({message: "Created new place"});
  } catch (e) {
    next(e);
  }
});

router.delete(':id', auth, permit('admin'), async(req, res, next) =>{
  try{
    if(req.body.user === 'admin'){
      const place = await Place.deleteOne({_id: req.params.id});
      return res.send(place);
    }
  }catch(e){
    next(e);
  }
})

module.exports = router;