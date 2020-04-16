const UserSchema = require('./schema');
const methods = require('./methods');

methods(UserSchema);

module.exports = {
  UserSchema,
};
