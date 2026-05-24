require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const mongoose = require("mongoose");
const User = require("../models/User");
const generateHtml = require("../generateHtml");
const allowedOrigin = require("../middleware/allowedOrigin");
const sendEmail = require("../worker/sendEmail")


router.post("/f/:id", allowedOrigin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const collection = mongoose.connection.db.collection("messages");

    const {
      _subject = "New Message",
      _redirect = "Default",
      _cc = "Default",
      ...data
    } = req.body;

    await collection.insertOne({
      ...data,
      userId: req.params.id,
      createdAt: new Date(),
    });

     res.redirect("https://formeze.netlify.app/submissionpage")

     if (user.emailNotification) {
      sendEmail(
        "New Form Submission",
        generateHtml("", "newMsg"),
        user.email,
      );
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      msg: "Server Error",
      error: error.message,
    });
  }
});

router.get("/form/fetch", fetchuser, async (req, res) => {
  if (req.verified == false)
    return res.status(401).send({
      success: false,
      msg: "Please verify your account before using the service.",
    });
  try {
    const collection = mongoose.connection.db.collection("messages");
    const document = await collection.find({ userId: req.id }).toArray();
    return res.status(200).send({ success: true, document });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Server Error" });
  }
});

router.delete("/delete/:id", fetchuser, async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res
      .status(404)
      .send({ success: false, msg: "Message ID not found." });
  if (req.verified == false)
    return res.status(401).send({
      success: false,
      msg: "Please verify your account before using the service.",
    });

  try {
    const collection = mongoose.connection.db.collection("messages");
    const objectId = new mongoose.Types.ObjectId(id);
    const document = await collection.findOneAndDelete({ _id: objectId });
    if (!document)
      return res.status(404).send({ success: false, msg: "Not Valid ID." });

    return res
      .status(200)
      .send({ success: true, msg: "Deleted Successfully!" });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Server Error" });
  }
});

router.get("/toggle/:id", fetchuser, async (req, res) => {
  if (req.verified == false)
    return res.status(401).send({
      success: false,
      msg: "Please verify your account before using the service.",
    });
  if (!req.params.id)
    return res.status(404).send({ success: false, msg: "Setting not found." });
  try {
    const collection = mongoose.connection.db.collection("messages");
    if (req.params.id == "email") {
      const user = await User.findById(req.id);
      await user.updateOne({ emailNotification: !user.emailNotification });
      return res.status(200).send({
        success: true,
        msg: `Email Notification turned ${user.emailNotification ? "OFF" : "ON"}`,
      });

      if (req.params.id == "allowedOrigin") {
        await user.updateOne({ allowedOrigin: req.body.origin });
        return res.status(200).send({
          success: true,
          msg: `Allowed Origin updated successfully!`,
        });
        return res
          .status(404)
          .send({ success: false, msg: "Setting not found." });
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: "Server Error" });
  }
});

module.exports = router;