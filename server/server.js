const PORT = process.env.PORT ?? 8000;
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/users", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/food", require("./routes/foodRoutes"));

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
