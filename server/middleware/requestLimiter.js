const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

const createLimiter = ({ windowMs, max, duration }) => {
  return rateLimit({
    windowMs,
    max, // Limit each Ip to 5 login requests per `window` per minute
    message: {
      message: `Too many requests from this IP, please try again after a ${duration} pause.`,
    },
    handler: (req, res, next, options) => {
      logEvents(
        `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
        "errLog.log"
      );
      res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
};

const loginLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  duration: "1 min",
});

const signupLimiter = createLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  duration: "1 min",
});

module.exports = {
  loginLimiter,
  signupLimiter,
};
