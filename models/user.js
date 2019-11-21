const mongoose = require("mongoose");

// USER MDL
const User = mongoose.model("User", {
  account: {
    username: "",
    email: "",
    password: "",
    phone: ""
  },
  token: ""
});

module.exports = Department;
