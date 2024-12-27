const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log('Authorization Header:', token);
  if (!token) {
    // console.log("Token not present ");
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "secret123");
    req.userId = decoded.user._id;
    req.userName = decoded.user.name;
    req.userEmail = decoded.user.email;
    next();
  } catch (error) {
    res.status(401).json({ status: "error", message: "Invalid token" });
  }
};
module.exports = authenticate;
