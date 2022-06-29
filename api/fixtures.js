const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require("nanoid");
const User = require('./models/User');

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
  })

  await mongoose.connection.close();
};

run().catch(e => console.error(e));