const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const sendHtmlEmail = asyncHandler(async (req, res) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Kyrians store",
      link: "https://kyrian.pro",
    },
  });

  let response = {
    body: {
      name: "Name",
      intro: "Welcome to kyrians store",
      action: [
        {
          instructions: "Click the button below to get started",
          button: [
            {
              color: "#00ff00",
              text: "Open website",
              link: "https://kyrian.pro",
              fallback: true,
            },
          ],
        },
      ],
    },
  };

  let mail = MailGenerator.generate(response);
  let message = {
    from: process.env.EMAIL_HOST_USER,
    to: req.body.email,
    subject: "This is my email",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then((info) => {
      res.status(200).json({
        msg: "Email sent",
        info: info.messageId,
      });
    })
    .catch((err) => {
      res.status(500);
      throw new Error(`Failed to send email ${err}`);
    });
});

const sendEmail = asyncHandler(async (req, res) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);
  let message = {
    from: process.env.EMAIL_HOST_USER,
    to: req.body.email,
    subject: "This is my email",
    html: "<p>Welcome to my website, this is my email</p>",
    attachments: [
      {
        filename: "resume.pdf",
        path: "attachments/resume.pdf",
        cid: "myresume123.pdf",
      },
      {
        filename: "dummyqr.png",
        path: "attachments/dummyqr.png",
        cid: "mydummy123.png",
      },
    ],
  };

  transporter
    .sendMail(message)
    .then((info) => {
      res.status(200).json({
        msg: "Email sent",
        info: info.messageId,
      });
    })
    .catch((err) => {
      res.status(500);
      throw new Error(`Failed to send email ${err}`);
    });
});

const getLoggedInUser = asyncHandler(async (req, res) => {
  res.json({
    message: "Getting the currently logged in user",
    user: req.user,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await userModel.findOne({ email });
  if (user) {
    const passwordMatch = bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const accessToken = jwt.sign(
        {
          user: {
            name: user.name,
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      res.json({ accessToken });
    } else {
      res.status(401);
      throw new Error("Invalid login credentials");
    }
  } else {
    res.status(401);
    throw new Error("Invalid login credentials");
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { email, phone, name, password } = req.body;
  console.log(email, phone, name);

  if (!email || !phone || !name || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = await User.create({
    email,
    phone,
    name,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user._id,
    email: user.email,
    name: user.name,
    phone: user.phone,
  });
});

const searchUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({
    name: req.params.name,
  });

  res.status(200).json(users);
});

const updateSingleUser = asyncHandler(async (req, res) => {
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
  console.log(req.user);
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
  loginUser,
  getLoggedInUser,
  sendEmail,
  sendHtmlEmail,
};
