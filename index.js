const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userRoute = require("./routes/user");
app.use(userRoute);

// const offerRoute = require("./routes/offer");
// app.use(offerRoute);

// const offersRoute = require("./routes/offers");
// app.use(offersRoute);

app.listen(process.env.PORT, () => {
  console.log("server started");
});
