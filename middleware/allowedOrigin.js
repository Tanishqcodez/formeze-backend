require("dotenv").config();
const User = require("../models/User");
const mongoose = require("mongoose");

const allowedOrigin = async (req, res, next) => {
  if (!req.params.id)
    return res.status(404).send({ success: false, msg: "User ID not found." });
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send({ success: false, msg: "User not found." });
  if (user.verified == false)
    return res.status(401).send({
      success: false,
      msg: "Please verify your account before using the service.",
    });

  try {
    // console.log(req.headers.origin);
    if (!user.allowedOrigin || user.allowedOrigin.trim() === "") {
      return next();
    }
    const origin = req.headers.origin;
    if (origin === user.allowedOrigin) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        msg: "Origin not allowed",
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Invalid or expired token, please re-login",
    });
  }
};

module.exports = allowedOrigin;
