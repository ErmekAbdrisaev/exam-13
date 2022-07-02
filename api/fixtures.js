const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require("nanoid");
const User = require('./models/User');
const Place = require('./models/Place');
const Review = require("./models/Review");
const Picture = require("./models/Picture");

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, admin] = await User.create({
    email: 'user@user.com',
    password: '123',
    token: nanoid(),
    role: 'user',
    displayName: 'User'
  }, {
    email: 'admin@user.com',
    password: '123',
    token: nanoid(),
    role: 'admin',
    displayName: 'Admin',
  });

  const [mossovet, osh, alamedin] = await Place.create({
    title: 'Mossovet',
    user: admin,
    image: 'mossovet.jpg',
    text: "Not bad place to eat. You could go with family"
  }, {
    title: 'OshBazaar',
    user: user,
    image: 'oshbazar.jpg',
    text: "Very dirty place to eat. Dangerous!!!!"
  },{
    title: 'Alamedinsky',
    user: admin,
    image: 'alamedin.jpeg',
    text: "Not good place to eat"
  });

  const [first, second, third] = await Review.create({
    place: mossovet,
    user: user,
    foodQlty: 5,
    serviceQlty: 3,
    interiorQlty: 4,
    description: "Not bad place to eat and take a rest"
  },{
    place: alamedin,
    user: admin,
    foodQlty: 1,
    serviceQlty: 3,
    interiorQlty: 2,
    description: "Bad rather than good"
  },{
    place: osh,
    user: user,
    foodQlty: 2,
    serviceQlty: 1,
    interiorQlty: 2,
    description: "Better find another place to eat and stay alive"
  });

  await Picture.create({
    place: alamedin,
    user: admin,
    image: '5-2.jpg'
  },{
    place: alamedin,
    user: admin,
    image: 'mam.jpg'
  },{
    place: alamedin,
    user: user,
    image: 'maminadacha.jpg'
  },{
    place: osh,
    user: user,
    image: 'mamino.jpg'
  },{
    place: osh,
    user: user,
    image: 'maminadacha2.jpg'
  },{
    place: osh,
    user: user,
    image: 'maminadacha.jpg'
  })

  await mongoose.connection.close();
};

run().catch(e => console.error(e));