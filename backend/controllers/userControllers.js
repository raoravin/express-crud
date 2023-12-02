const User = require("../model/userModel");

exports.home = (req, res) => {
  res.send("Hello Alpha");
};

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email } = req.body;
    //to check all the detail
    if (!name && !email) {
      req.status(401).json({
        success: false,
        message: "Enter Username and Email !!",
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(401).json({
        success: false,
        message: "User already exists !!",
      });
    }
    //Insereting into the database
    const user = await User.create({ name, email });
    res.status(201).json({
      success: true,
      message: "User created successfully !!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const email = req.body.email;
    if (email) {
      res.status(401).json({
        success: false,
        message: "Can't change email !!",
      });
    } else {
      await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "User updated successfully !!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User Delete successfully !!",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
