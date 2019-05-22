const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Authorization failed: No Token" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret")); //decode the token using secret
    req.profile = decoded.profile;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};
