//imports express, morgan, cors, express-rate-limit, initializes express and imports the following files from given paths
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
const ErrorMessageHandlerClass = require("./routes/utils/ErrorMessageHandlerClass");
const errorController = require("./routes/utils/errorController");
const userRouter = require("./routes/user/userRouter");
const twilioRouter = require("./routes/twilio/twillioRouter");

app.use(cors());

//if process.env.node_env = dev use logger
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

//sets limit for requests
const limiter = rateLimit({
  max: 20,
  windowMs: 1 * 60 * 1000, //this is in millie second
  message:
    "Too many requests from this IP, please try again or contact support",
});

app.use("/api", limiter);
app.use(express.json());
//parsing form data/incoming data
app.use(express.urlencoded({ extended: false }));

//allows use of following files with given paths
app.use("/api/user", userRouter);
app.use("/api/twilio", twilioRouter);

app.all("*", function (req, res, next) {
  next(
    new ErrorMessageHandlerClass(
      `Cannot find ${req.originalUrl} on this server! Check your URL`,
      404
    )
  );
});
app.use(errorController);
module.exports = app;
