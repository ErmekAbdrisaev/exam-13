const express = require('express');
const User = require('../models/User');
const mongoose = require("mongoose");
const auth = require("../middlewear/auth");
const {nanoid} = require("nanoid");
const config = require('../config');
const multer = require('multer');

const path = require("path");

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (e) {
    next(e);
  }
})

router.post('/', async (req, res, next) => {
  console.log(req.body);
  try {
    const userData = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
    });

    const user = new User(userData);

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

router.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return res.status(400).send({error: 'Email not found'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: 'Password is wrong'});
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    next(e);
  }
});

router.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const message = {message: 'OK'};

    if (!token) return res.send(message);

    const user = await User.findOne({token});

    if (!user) return res.send(message);

    user.generateToken();
    await user.save();

    return res.send(message);
  } catch (e) {
    next(e);
  }
})
module.exports = router;