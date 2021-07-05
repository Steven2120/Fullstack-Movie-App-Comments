//creates function that checks if that are no keys or anything entered by client. if so advise to fill out from
function checkIsUndefined(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(500).json({ message: "Please fill out the form" });
  }
  //create error object sets res.locals to errorobj and go to next middleware function
  else {
    let errorObj = {};
    res.locals.errorObj = errorObj;
    next();
  }
}
//export function
module.exports = checkIsUndefined;
