const queriesToLowercaseMiddleware = (req, res, next) => {
  for (let key in req.query) {
    req.query[key.toLowerCase()] = req.query[key].toLowerCase();
  }
  next();
};

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong try again later",
  };

  if (err.name === "TypeError") {
    customError.statusCode = 400;
    customError.message = "Wrong queries supplied";
  }
  if (err.name === "serialOnlyError") {
    customError.statusCode = 400;
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

export { errorHandlerMiddleware, queriesToLowercaseMiddleware };
