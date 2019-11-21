const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userRoute = require("./routes/user");
app.use(userRoute);

app.listen(process.env.PORT, () => {
  console.log("server started");
});
