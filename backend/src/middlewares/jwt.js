const jwt = require("jsonwebtoken");
const verify = {
  verify_token: (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: "token is not valid",
          });
        }
        console.log(user);
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "you are not authenticated",
      });
    }
  },
};

module.exports = verify;
