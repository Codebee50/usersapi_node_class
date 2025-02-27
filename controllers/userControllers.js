const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const userModel = require("../models/userModel");

const createUser = asyncHandler(async (req, res) => {
  const { email, phone, name } = req.body;
  console.log(email, phone, name);

  if (!email || !phone || !name) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.create({
    email,
    phone,
    name,
  });

  res.status(201).json(user);
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find().exec();
  // const query = await userModel.find({name: "Kyrian"})
  res.status(200).json(users);
});

const getSingleUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user){
    res.status(404)
    throw new Error('User not found')
  }
  res.json(user);
});

module.exports = {
  createUser,
  getUsers,
  getSingleUser,
};
