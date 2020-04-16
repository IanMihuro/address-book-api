const mongoose = require('mongoose');
const { UserSchema } = require('./user');
const { AddressSchema } = require('./address');

module.exports = {
  User: mongoose.model('User', UserSchema),
  Address: mongoose.model('Address', AddressSchema),
};
