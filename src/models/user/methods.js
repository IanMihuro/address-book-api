function comparePasswords(str, password) {
  return str === password;
}

module.exports = (schema) => {
  schema.methods.validatePassword = function(password) {
    // check if passwords are the same
    const userPassword = this.get('password');
    return comparePasswords(password, userPassword);
  };
}