const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; //get the header part that contains the info(data sent before like id and name) we want(?) for the case that the user does not have a token so that we are not spliting on something that is empty which gives error
  if (!token) {
    res.status(403).send("Forbidden"); //no token found
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //decode token with our secret key
    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    ); //select the user from users table without the password
    req.user = user; //now after this middleware the necxt function will be able to access the user info from the req of the function(the controller)
    next();
  }
};

module.exports = {
  authMiddleware,
};
