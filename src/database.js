const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect(
    'mongodb://localhost:27017/people-db',
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    }
  )
    .then(() => {
      console.log('Connected to mongodb...')
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
      process.exit(-1);
    });
};

module.exports = {
  connectDatabase,
};