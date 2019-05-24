const { validationResult } = require('express-validator/check');

const buildCRUD = (app) => ({
  path, 
  model, 
  primaryKey = '_id', 
  createValidators = []
}) => {
  // List
  app.get(`${path}`, async (req, res) => {
    const instances = await model.find({});
  
    res.send(instances);
  });
  
  // Create
  app.post(`${path}`, createValidators, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    const instance = await model.create(req.body);
    res.send(instance);
  });
  
  // Retrieve
  app.get(`${path}/:${primaryKey}`, async (req, res) => {
    const instance = await model.findOne({username: req.params[primaryKey]});
  
    if(instance) {
      res.send(instance);
    } else {
      res.sendStatus(404);
    }
  });
  
  // Update
  app.patch(`${path}/:${primaryKey}`, async (req, res) => {
    const instance = await model.findOneAndUpdate(
      {username: req.params[primaryKey]},
      req.body,
      { new: true }
    );
  
    if(instance) {
      res.send(instance);
    } else {
      res.sendStatus(404);
    }
  });
  
  // Delete
  app.delete(`${path}/:${primaryKey}`, async (req, res) => {
    const instance = await model.findOneAndDelete({username: req.params[primaryKey]});
  
    if(instance) {
      res.send(instance);
    } else {
      res.sendStatus(404);
    }
  });
};

module.exports = {
  buildCRUD,
}