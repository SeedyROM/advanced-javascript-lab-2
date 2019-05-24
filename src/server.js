const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bodyParser = require('body-parser');

const { connectDatabase } = require('./database');
const { Person } = require('./model');
const { buildCRUD } = require('./crud');

connectDatabase();
const app = express();
app.use(bodyParser.json());

const createPersonValidators = [
  check("firstName").exists(),
  check("lastName").exists(),
  check("username").exists(),
  check("age").exists().isNumeric(),
]

buildCRUD(app)({
  path: '/people', 
  model: Person, 
  primaryKey: 'username',
  createValidators: createPersonValidators
});

app.listen(4000, () => {
  console.log('Listening on port 4000...');
});