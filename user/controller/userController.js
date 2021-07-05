//imports bcryptjs, jsonwebtoken and user file schema
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

//creates async function signup that assists in signing up
async function signup(req, res, next) {
  const { username, email, password, firstName, lastName } = req.body;
  const { errorObj } = res.locals;

  //if there are any errors respond with json err msg
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
  try {
    //generates hashed password and creates new user and then it saves also giving the following success msg
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });
    let savedUser = await createdUser.save();
    res.json({ message: "success", data: savedUser });
  } catch (e) {
    // console.log(e);
    // console.log(e.message);
    //res.status(500).json({ message: "error", error: e });
    console.log("1");
    next(e);
  }
}

//creates async function login that grabs what user enters in email in pass and if there are any errors, they are displayed and if passwords dont match it also notifies user
async function login(req, res) {
  const { email, password } = req.body;
  const { errorObj } = res.locals;
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }
  try {
    let foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password",
      });
    } else {
      //password = 1, foundUser.password = $2a$12$tauL3AEb5gvKdcQdDKNWLeIYv422jNq2aRsaNWF5J4TdcWEdhq4CO
      let comparedPassword = await bcrypt.compare(password, foundUser.password);
      //if passwords dont match, notifies user
      if (!comparedPassword) {
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password",
        });
      } else {
        //if they do match sets token and displays success msg
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          process.env.PRIVATE_JWT_KEY,
          {
            expiresIn: "1m",
          }
        );
        res.json({ message: "success", payload: jwtToken });
      }
    }
    //catches err and displays err
  } catch (e) {
    res.json({ message: "error", error: e });
  }
}
module.exports = { signup, login };
