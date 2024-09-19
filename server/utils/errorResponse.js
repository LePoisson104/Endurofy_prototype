class errorResponse extends Error {
  constructor(message, statusCode) {
    super(message); // Pass the message to the base Error class
    this.statusCode = statusCode; // Add a custom statusCode property
    this.isOperational = true; // Optional flag to differentiate operational errors
    Error.captureStackTrace(this, this.constructor); // Captures where the error originated from
  }
}

module.exports = errorResponse;
