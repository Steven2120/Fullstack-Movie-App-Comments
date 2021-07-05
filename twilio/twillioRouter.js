//imports express
const express = require("express");
const router = express.Router();

//imports following file
const jwtMiddleware = require("../utils/jwtMiddleware");

//following code allows user to be able to send sms message to the given phone number
const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

router.post("/send-sms", function (req, res) {
  client.messages
    .create({
      body: req.body.message,
      from: "+1234557",
      to: "+123456789",
    })
    .then((message) => res.json(message))
    .catch((error) => {
      console.log(error.message);

      res.status(error.status).json({ message: error.message, error });
    });
});
module.exports = router;
