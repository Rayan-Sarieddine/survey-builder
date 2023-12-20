const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) res.status(400).send({ message: "invalid credentials" });
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    res.status(400).send({ message: "invalid credentials2" });

  //destruct the user details, except the password, rename password to hashed password cz you aleardy used a var called password above, hence rename to another name called hashedpassword
  const { password: hashedPassword, ...userDetails } = user.toJSON(); //so that i don't get the undesired user data (stamps, numbers ...)
  //sign generates the jwt token
  const token = jwt.sign(
    {
      //data that you want to be in the jwt
      ...userDetails, //done this and not chosen each property we want like name:username,.... cz we want to send the user entirely in the send res
    },
    process.env.JWT_SECRET,
    { algorithm: "HS256", expiresIn: "2 days" }
  );
  res.status(200).send({ user: userDetails, token: token, status: "success" });
};

const register = async (req, res) => {
  const { email, password, name, role_id } = req.body;
  if (!email || !password || !name || !role_id) {
    res.status(400).send({ message: "all fileds are required" });
  }
  try {
    const user = new User({
      email,
      password,
      name,
      role_id,
    });
    //or  const user = await User.create({ username, password, firstName, lastName });
    await user.save();
    res.status(200).send({ user, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

module.exports = { login, register };
