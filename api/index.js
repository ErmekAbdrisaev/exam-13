const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const config = require('./config');
const users = require('./app/users');
const places = require('./app/places');
const pictures = require('./app/pictures');
const review = require('./app/reviews');

const app = express();

const port = 8000;

const whiteList = ['http://localhost:4200', 'https://localhost:4200', 'http://localhost:4210'];

const corsOptions = {
  origin: (origin, callback) => {
    if(origin === undefined || whiteList.indexOf(origin) !== -1){
      callback(null, true);
    } else{
      callback(new Error('Not allowed by cors'))
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/users', users);
app.use('/places', places);
app.use('/pictures', pictures);
app.use('/review', review);

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  app.listen(config.port, () => {
    console.log(`Server started on ${config.port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(e => console.error(e));