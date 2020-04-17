const { constants: { ALLOWED_ADDRESS_FIELDS } } = require('../../lib/');

const fieldsToPick = ['_id', ...ALLOWED_ADDRESS_FIELDS];

function pickFieldsFromDb(obj, fields) {
  const keys = Object.keys(obj);
  let filteredObj = {};
  const newKeys = keys.filter(i => fields.includes(i));
  newKeys.forEach(key => {
    filteredObj[key] = obj[key];
  });

  return filteredObj;
}

module.exports = (addressSchema) => {
  addressSchema.methods.sanitize = function selectFields() {
    const address = this;
    const filteredAddress = pickFieldsFromDb(address.toObject(), fieldsToPick)

    return filteredAddress;
  }
}