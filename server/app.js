const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const coreOptions = require("./config/corOptions");

app.use(helmet());
app.use(cors(coreOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/users", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));

module.exports = app;
