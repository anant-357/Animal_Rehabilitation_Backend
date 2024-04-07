const express = require("express");
const db = require("./db/db.js");
require("dotenv").config();
const userRoute = require("./routes/userRouter");
const centerRoute = require("./routes/centerRouter");
const doctorRoute = require("./routes/doctorRouter");
const AppError = require("./utils/appError");
const cors = require("cors");

db();

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({
    message:
      "Server Running!, Check out endpoints: /api/user/ and /api/center/",
  });
});

app.use("/api/user/", userRoute);
app.use("/api/center/", centerRoute);
app.use("/api/doctor/", doctorRoute);

app.all("*", (_req, _res, next) => {
  next(new AppError("Cannot find on this server", 404));
});

const port = 8080;

app.listen(port, () => {
  console.log("Listening On Port: ", port);
});
