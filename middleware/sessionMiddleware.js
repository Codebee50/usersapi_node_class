const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateSession = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401);
      throw new Error("Authentication credentials are required");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Authentication credentials are invalid");
      }
      req.user = decoded.user;
      next();
    });
  }

  res.status(401);
  throw new Error("Invalid or missing authentication credentials");
});

module.exports = validateSession;
