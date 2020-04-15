const mongoose = require("mongoose");
const validator = require("validator");

const addressSchema = new mongoose.Schema({
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
        throw new Error("A valid email is required");
      }
    },
  },
  postalAddress: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
