const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const AddressSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('A valid email is required');
      }
    },
  },
  postalAddress: {
    type: String,
    trim: true,
    lowercase: true,
  },
});


module.exports = { AddressSchema };
