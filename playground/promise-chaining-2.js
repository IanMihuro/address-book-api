require("../src/db/moongose");
const Address = require("../src/models/address");

// Address.findByIdAndDelete("5e8ccfe289d82535cff7102f")
//   .then((res) => {
//     console.log(res);
//     return Address.countDocuments({});
//   })
//   .then((res) => console.log(res))
//   .catch((e) => console.log(e));

const deleteAddressAndCount = async (id, filter) => {
  const address = await Address.findByIdAndDelete(id);
  const count = await Address.countDocuments({ filter });

  return { address, count };
};

deleteAddressAndCount("5e8f352ccb92755024805dcd", null)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
