const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    unique: true,
  },
  age: Number,
});

const Person = mongoose.model('Person', personSchema);

module.exports = {
  Person,
};