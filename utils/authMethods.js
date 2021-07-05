//imports the following functions from validator
const {
  isEmpty,
  isStrongPassword,
  isEmail,
  isAlpha,
  isAlphanumeric,
} = require("validator");
//initiates variable that has value of a function with a target parameter and it checks if target is empty return true else return false
const checkIsEmpty = (target) => (isEmpty(target) ? true : false);
//creates variable that has a value of a function with a password parameter and it checks if password is strong enough return true else return false
const checkIsStrongPassword = (password) =>
  isStrongPassword(password) ? true : false;
//creates variable that has an email parameter that validiates if email is correct format
const checkIsEmail = (email) => (isEmail(email) ? true : false);
//creates variable that has value of function which contains target parameter and checks if target contains only alpha chars
const checkIsAlpha = (target) => (isAlpha(target) ? true : false);
//creates variable that has value of a function that contains target parameter and checks if target is alphanumeric
const checkIsAlphanumeric = (target) => (isAlphanumeric(target) ? true : false);
//exports functions
module.exports = {
  checkIsEmpty,
  checkIsStrongPassword,
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
};
