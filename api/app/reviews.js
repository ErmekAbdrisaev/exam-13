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
    if(req.query.user){
      query.user = {_id: req.query.user};
    }

    const reviews = await Review.find(query).populate('place', 'title');
    return res.send(reviews);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).send({message: "Not found"});
    }
    return res.send(review);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    const reviewData = {
      place: req.body.place,
      user: req.user._id,
      foodQlty: req.body.foodQlty,
      serviceQlty: req.body.serviceQlty,
      interiorQlty: req.body.interiorQlty,
      description: req.body.description,
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