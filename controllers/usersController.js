const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const { generateHashedPassword, createSendToken } = require("../utils");
//register user
exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  //encrypt password
  const hashedPwd = await generateHashedPassword(password);
  console.log(hashedPwd);
  //create user
  try {
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPwd,
      role,
    });
    createSendToken(user, req, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      res.status(404).json({
        status: "failed",
        message: "no users found",
      });
    }
    res.status(200).json({
      status: "sucess",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //search user using email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      res.status(404).json({
        status: "failed",
        message: "no user found",
      });
      return;
    }
    //compare password
    const passWordCorrect = await bcrypt.compare(password, user.password);
    if (!passWordCorrect) {
      res.status(401).json({
        status: "failed",
        message: "Invalid username or password",
      });
    }
    if (passWordCorrect) {
      createSendToken(user, req, res);
    }
  } catch (error) {
    console.log(error.message);
  }
};
//login
exports.getUser = async (req, res) => {
  const id = req.user;
  try {
    //search user using email
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      res.status(404).json({
        status: "failed",
        message: "no user found",
      });
      return;
    }
    const newUser = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      _id: user._id,
    };
    res.status(200).json({
      status: "success",
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
  }
};
