function capitalizeName(name) {
  return name.toUpperCase(); // NAME
}

module.exports = (addressSchema) => {
  addressSchema.pre('save', async function(next) {
    // capitalize the name
    const name = this.get('name');
    const newName = capitalizeName(name);

    // mongoose operation
    this.set('name', newName);

    await next();
  });
};
