const express = require('express');
const Review = require("../models/Review");
const auth = require("../middlewear/auth");
const permit = require("../middlewear/permit");
const Place = require("../models/Place");

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const query = {};
    if (req.query.review) {
      query.review = {_id: req.query.review}
    }
    const review = await Review.find(query).populate('place', 'title');
    return res.send(review);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const reviews = await Review.findById(req.params.id);

    if (!reviews) {
      return res.status(404).send({message: "Not found"});
    }
    return res.send(reviews);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, permit('admin', 'user'), async (req, res, next) => {
  try {
    if (!req.body.review) {
      return res.status(404).send({message: 'Fill required fields'});
    }
    const reviewData = {
      place: req.body.place,
      user: req.body.user,
      foodQlty: req.body.foodQlty,
      serviceQlty: req.body.serviceQlty,
      interiorQlty: req.body.interiorQlty,
      text: req.body.text,
    };
    const review = new Review(reviewData);
    await review.save();
    return res.send({message: 'Created new review', id: review._id});
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, permit('admin'), async(req, res, next) =>{
  try{
    if('admin'){
      const review = await Review.deleteOne({_id: req.params.id});
      return res.send(review);
    }
  }catch(e){
    next(e);
  }
})

module.exports = router;