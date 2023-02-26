const jwt = require("jsonwebtoken");
const authenticate = function (req, res, next) {
  let token = req.headers.authorization;
  jwt.verify(token, "Jayesh", function (err, decoded) {
    if (decoded) {
      req.body.userID = decoded.userID;
      next();
    } else {
      res.send("Login First!");
    }
  });
};

module.exports = {
  authenticate,
};
