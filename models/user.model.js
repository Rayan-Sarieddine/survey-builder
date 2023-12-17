const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  img_url: {
    type: String,
    minlength: 5,
    required: true,
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

userschema.pre(
  "save",
  async function (next) {
    //this does not work in anonyms fnctions
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userschema);

module.exports = User;
