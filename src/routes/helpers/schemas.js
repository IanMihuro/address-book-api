const { Joi } = require('celebrate');
const { errors: { JoiValidationError } } = require('../../lib');

const addressSchema = Joi.object().keys({
  name: Joi.string()
    .min(5).required()
    .error(
      new JoiValidationError('A name must contain at least 5 characters'),
    ),
  phoneNumber: Joi.string()
    .min(10)
    .max(16)
    .error(
      new JoiValidationError(
        'A phone number must be between 10 & 16 characters long',
      ),
    ),
  email: Joi.string()
    .email().required()
    .error(new JoiValidationError('Email is a required field')),
  postalAddress: Joi.string().required().error(
    new JoiValidationError('Postal Address is a required field'),
  ),
});

module.exports = {
  addressSchema,
};
