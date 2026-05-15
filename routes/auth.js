require("dotenv").config();
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
const JWT_SECRET = process.env.JWT_SECRET;
const randomString = require("randomstring");
const nodemailer = require("nodemailer");
const generateHtml = require("../generateHtml");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/signup", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: "Sorry! A user already exits with this email!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    let token = randomString.generate();
    const mailOption = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Verify Your Formeze Account",
      html: generateHtml(token, "verify"),
    };
    const expiryTime = new Date(Date.now() + 15 * 60 * 1000);

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      verificationToken: token,
      verificationTokenExpiry: expiryTime,
      verified: false,
      created_at: Date.now(),
    });

    transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }
    });
    const data = {
      id: user.id,
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.status(200).json({
      success: true,
      authToken,
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Internal Server Error" });
    console.log(error);
  }
});

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Wrong username or password" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Wrong username or password" });
      }
      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, authToken, verified: user.verified });
    } catch (error) {
      res.status(500).send({ success: false, msg: "Internal server occured!" });
    }
  },
);

router.get("/fetch", fetchuser, async (req, res) => {
  try {
    let user = await User.findById(req.id).select(
  "-password -resetPasswordToken -verificationToken -verificationTokenExpiry"
);
    if (!user)
      return res.status(404).send({ success: false, msg: "User not found" });
    res.status(200).send({ success: true, user });
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, msg: "Internal server occured!" });
  }
});

router.post(
  "/forgot",
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (!user)
        return res
          .status(404)
          .send({ success: false, msg: "404 - Email Not Found" });
      if (user.resetPasswordToken !== "")
        return res.status(500).send({
          success: false,
          msg: "already sent a reset link to your gmail",
        });

      let token = randomString.generate();

      await User.findOneAndUpdate(
        { email: req.body.email },
        { resetPasswordToken: token },
        { new: true },
      );

      const mailOption = {
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: "Password Recovery Email",
        html: generateHtml(token, "reset"),
      };
      transporter.sendMail(mailOption, (err) => {
        if (err) return res.status(500).send(err);
      });
      return res.status(200).send({
        success: true,
        msg: "An Email with reset link to your password has been send",
      });
    } catch (error) {
      res.status(500).send({ success: false, msg: "Internal server occured!" });
    }
  },
);

router.post(
  "/reset/:token",
  [body("password", "please enter your password").exists()],
  async (req, res) => {
    try {
      let token = req.params.token;
      if (!token)
        return res.status(404).send({ success: false, msg: "Token not found" });

      let user = await User.findOne({ resetPasswordToken: token });
      if (!user)
        return res.status(404).send({ success: true, msg: "user not found" });

      let password = req.body.password;
      if (!password)
        return res
          .status(404)
          .send({ success: false, msg: "invalid type of password" });

      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.password, salt);

      await User.findOneAndUpdate(
        { resetPasswordToken: token },
        { password: hashed_password, resetPasswordToken: "" },
      );
      res
        .status(200)
        .send({ success: true, msg: "password updated successfully" });
    } catch (error) {
      res.status(500).send({ success: false, msg: "Internal server occured!" });
    }
  },
);

router.get("/createverificationtoken", fetchuser, async (req, res) => {
  try {
    let user = await User.findById(req.id);
    if (!user)
      return res.status(404).send({ success: false, msg: "No Account Found" });
    if (user.verified)
      return res
        .status(500)
        .send({ success: false, msg: "User Already Verefied " });

    let token = randomString.generate();

    const expiryTime = new Date(Date.now() + 15 * 60 * 1000);

    await User.findByIdAndUpdate(
      req.id,
      { verificationToken: token, verificationTokenExpiry: expiryTime },
      { new: true },
    );

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Verify Your Email",
      html: generateHtml(token, "verify"),
    };
    transporter.sendMail(mailOption, (err) => {
      if (err) return res.status(500).send(err);
    });
    res
      .status(200)
      .send({ success: true, msg: "Verification Link Sent Successfully" });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Internal server occured!" });
  }
});

router.get("/verify/:token", fetchuser, async (req, res) => {
  try {
    let token = req.params.token;
    let user = await User.findById(req.id);

    if (!user)
      return res.status(404).send({ success: false, msg: "No Account Found" });
    if (user.verified)
      return res
        .status(500)
        .send({ success: false, msg: "User Already Verefied " });

    const currentTime = new Date();
    if (currentTime > user.verificationTokenExpiry) {
      await User.findByIdAndUpdate(req.id, {
        verificationToken: "",
        verified: false,
        verificationTokenExpiry: "",
      });
      return res.status(400).json({ success: false, msg: "Token has expired" });
    }

    if (user.verificationToken === token) {
      await User.findByIdAndUpdate(req.id, {
        verificationToken: "",
        verified: true,
        verificationTokenExpiry: "",
      });
      res
        .status(200)
        .send({ success: true, msg: "Account Verifed Successfully" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: "Internal server occured!" });
  }
});

module.exports = router;
