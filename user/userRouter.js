//imports express
const express = require("express");

const router = express.Router();

//imports following items from given file
const { signup, login } = require("./controller/userController");

//imports following file
const checkIsUndefined = require("./helpers/checkIsUndefined");

//imports following file
const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc");

//imports following file
const checkIsStrongPasswordFunc = require("./helpers/checkIsStrongPasswordFunc");

const {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
} = require("./helpers/authMiddleware");
const MessagingResponse = require("twilio/lib/twiml/MessagingResponse");
//sets path for sign-up and calls following functions
router.post(
  "/sign-up",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsStrongPasswordFunc,
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
  signup
);
//sets path for login and calls following functions
router.post(
  "/login",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsEmailFunc,
  login
);
module.exports = router;
