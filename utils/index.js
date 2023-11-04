const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.generateHashedPassword = async (cleanPassword) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(cleanPassword, salt);
  return hashedPassword;
};

exports.generateJwtToken = (userId, userType, expiresIn = "0.5y") => {
  const token = jwt.sign(
    { id: userId, userType: userType },
    process.env.JWT_SECRET,
    {
      expiresIn,
    }
  );
  return token;
};
exports.createSendToken = (user, req, res) => {
  //generate jwt token
  const token = this.generateJwtToken(user._id, user.role);

  const cookieOPtions = {
    expiresIn: "60d",
    httpOnly: true,
  };
  if (process.env.NODE_ENV == "production") cookieOPtions.secure = true;
  const newUser = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    _id: user._id,
  };

  res.cookie("jwt", token, cookieOPtions);

  res.status(200).json({
    status: "success",
    token,
    user: newUser,
  });
};
