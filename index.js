const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const formidable = require("express-formidable");

require("dotenv").config();

const app = express();

//app.use(express.json()); //not using the body-parser from express
app.use(cors());
// need to use req.fields instead of req.body because of formidable
app.use(formidable());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userRoute = require("./routes/user");
app.use(userRoute);

const offerRoute = require("./routes/offer");
app.use(offerRoute);

// const offersRoute = require("./routes/offers");
// app.use(offersRoute);

app.listen(process.env.PORT, () => {
  console.log("server started");
});
