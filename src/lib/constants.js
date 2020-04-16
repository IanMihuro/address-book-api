const ALLOWED_USER_FIELDS = Object.freeze(['email', 'password', 'isAdmin']);
const ALLOWED_ADDRESS_FIELDS = Object.freeze([
  'name',
  'phoneNumber',
  'email',
  'postalAddress',
]);

module.exports = { ALLOWED_USER_FIELDS, ALLOWED_ADDRESS_FIELDS };
