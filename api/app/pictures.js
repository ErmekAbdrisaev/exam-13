const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const permit = require("../middlewear/permit");
const auth = require("../middlewear/auth");
const Picture = require("../models/Picture");

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

    if (req.query.user){
      query.user = {_id: req.query.user}
    }

    const pictures = await Picture.find(query).populate('user', 'displayName');

    return res.send(pictures);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).send({message: 'No such picture'});
    }
    return res.send(picture);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, permit('user'), upload.single('image'), async (req, res, next) => {
  try {
    const pictureData = {
      user: req.body.user,
      title: req.body.title,
      image: null,
    }

    if (req.file) {
      pictureData.image = req.file.filename;
    }

    const picture = new Picture(pictureData);
    await picture.save();

    return res.send(
      {message: 'Created new picture in album', id: picture._id});
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, permit('admin'), async(req, res, next) =>{
  try{

    const picture = await Picture.deleteOne({_id: req.params.id});
    return res.send(picture);
  }catch(e){
    next(e);
  }
});

module.exports = router;