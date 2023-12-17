const mongoose = require("mongoose");
const roleschema = new mongoose.Schema({
  name: {
    unique: true,
  },
});

const Role = mongoose.model("Role", roleschema);

module.exports = Role;
