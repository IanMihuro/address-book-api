const express = require('express');
const User = require('../../models/user');
const router = new express.Router();
const version = process.env['API_VERSION'];
const { ALLOWED_USER_FIELDS } = require('../../lib/constants');

//Create User
router.post(`${version}/users`, async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Read all Users
router.get(`${version}/users`, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

//Read user by :id
router.get(`${version}/users/:id`, async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//Update user
router.patch(`${version}/users/:id`, async (req, res) => {
  const _id = req.params.id;
  const update = req.body;
  const updatesArray = Object.keys(req.body);
  const isValidOperation = updatesArray.every((update) =>
    ALLOWED_USER_FIELDS.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findByIdAndUpdate(_id, update, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Delete user
router.delete(`${version}/users/:id`, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
