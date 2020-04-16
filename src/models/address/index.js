const { AddressSchema } = require('./schema');
// const hooks = require('./hooks');
const methods = require('./methods');

// hooks(AddressSchema);
methods(AddressSchema);

module.exports = {
  AddressSchema,
};
