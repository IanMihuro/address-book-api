const express = require("express");
require("./db/moongose");
const userRouter = require("./routers/users");
const addressRouter = require("./routers/addresses");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(addressRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
