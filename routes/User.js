const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

require('../models/User');
const User = mongoose.model('user');

// get all the Users
router.get('/', (req, res) => {
  User.find({}, function(err, users) {
    if (err) {
      return;
    }
    res.json(users);
  });
});

// Select one User

router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) {
      res.send('Not Found');
      return;
    }
    res.json(user);
  });
});

// Delete a specific User
router.delete('/:id', (req, res) => {
  User.remove({ _id: req.params.id }, function(err) {
    if (err) {
      res.send('Not Found');
      return;
    }
    res.send('Deleted');
  });
});

// Create a New User
router.post('/', (req, res) => {
  User.create(req.body, function(err, user) {
    if (err) {
      console.log('Error Occured while adding User');
      return;
    }
    res.json(user);
    console.log('User Created');
  });
});

// Update a New User
router.patch('/:id', (req, res) => {
  var query = { _id: req.params.id };

  User.update(query, req.body, function(err, question) {
    if (err) {
      console.log('Error Occured while updating User');
      return;
    }
    res.json(question);
    console.log('User Updated');
  });
});

module.exports = router;
