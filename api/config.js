const path = require('path');

const rootPath = __dirname;

let dbUrl = 'mongodb://localhost/exam-13';
let port = 8000;

if (process.env.NODE_ENV === 'test') {
  dbUrl = 'mongodb://localhost/exam-13-test';
  port = 8010;
}

module.exports = {
  port,
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: dbUrl,
    options: {useNewUrlParser: true},
  }
};