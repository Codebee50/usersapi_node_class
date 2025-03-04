const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");


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

const searchUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({
    name: req.params.name,
  });

  res.status(200).json(users);
});

const updateSingleUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const response = await userModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );

  const { matchedCount, modifiedCount } = response;
  if (matchedCount < 1) {
    res.status(404);
    throw new Error("Failed to update instance");
  }

  if (modifiedCount < 1) {
    res.status(404);
    throw new Error("Did not update any fields");
  }

  res.json({
    message: "User updated successfully",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const response = await userModel.updateOne(
    {
      _id: req.params.id,
    },
    {
      name,
    }
  );
  console.log(response);
  res.json({
    message: "User updated successfully",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find().exec();
  // const query = await userModel.find({name: "Kyrian"})
  res.status(200).json(users);
});

const getSingleUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

module.exports = {
  createUser,
  getUsers,
  getSingleUser,
  searchUsers,
  updateUser,
  updateSingleUser,
};
