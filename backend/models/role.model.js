const mongoose = require("mongoose");
const roleschema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});

const Role = mongoose.model("Role", roleschema);

module.exports = Role;
