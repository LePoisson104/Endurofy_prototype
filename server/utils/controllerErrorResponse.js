const controllerErrorResponse = (res, err) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ message: err.message });
};

module.exports = controllerErrorResponse;
