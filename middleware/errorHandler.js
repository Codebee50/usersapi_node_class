const errorHandler = (err, req, res, next) => {
  console.log("error code", res.statusCode, err.message);
  const statusCode = res.statusCode || 500;
  switch (statusCode) {
    case 400:
      res.json({
        title: "Validation error",
        message: err.message,
        status: res.statusCode,
      });
      break;
    case 500:
      res.json({
        title: "Server error",
        message: err.message,
        status: res.statusCode,
      });
      break;
    case 401:
      res.json({
        title: "Unauthorized",
        message: err.message,
        status: res.statusCode,
      });
      break;
    default:
      res.json({
        message: err.message,
        title: "Unknown error",
        status: res.statusCode,
      });
  }
};

module.exports = errorHandler;
