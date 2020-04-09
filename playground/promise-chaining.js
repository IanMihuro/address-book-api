require("../src/db/moongose");
const User = require("../src/models/user");

// User.findByIdAndUpdate("5e8e039f4bad8d44069dc82d", { isAdmin: false })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ isAdmin: false });
//   })
//   .then((result) => console.log(result))
//   .catch((e) => console.log(e));

const updateRightsAndCount = async (id, isAdmin) => {
  const user = await User.findByIdAndUpdate(id, { isAdmin });
  const count = await User.countDocuments({ isAdmin });

  return { user, count };
};

updateRightsAndCount("5e8ccc65328891351e758d2b", false)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
