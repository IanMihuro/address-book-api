require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
require("./config/db");
const userRouter = require("./routes/user");
const addressRouter = require("./routes/address");
const heartbeatRouter = require("./routes/heartbeat");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(heartbeatRouter);
app.use(userRouter);
app.use(addressRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
