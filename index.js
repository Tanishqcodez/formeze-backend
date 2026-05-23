require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const dns = require("dns");
const { BrevoClient } = require("@getbrevo/brevo");
const connectToMongo = require("./db");
const Contact = require("./models/Contact");
const sendEmail  = require("./worker/sendEmail");

dns.setDefaultResultOrder("ipv4first");

const app = express();
const port = 5000;

connectToMongo();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.options("/*splat", cors());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
});

//Routes
app.use("/f", limiter);
app.use("/api/auth", require("./routes/auth"));
app.use("/", require("./routes/form"));

app.get("/status", (req, res) => {
  try {
    res.status(200).send({
      success: true,
      msg: "OK",
    });
  } catch (error) {
    res.status(501).send({
      success: false,
      msg: error.message,
    });
  }
});



app.post("/contact",limiter, async (req, res) => {
  const {
    name,
    email,
    company,
    topic,
    message,
  } = req.body;

  if (!name || !email || !topic || !message) {
    return res.status(400).send({
      success: false,
      msg: "Please fill all required fields.",
    });
  }

  try {

    await Contact.create({
      name,
      email,
      company,
      topic,
      message,
      created_at: new Date(),
    });
    return res.status(200).send({
      success: true,
      msg: "Message received successfully.",
    });
      sendEmail(
        `New Contact Form Submission: ${topic}`,
        `<h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>`,
        "programwithtanishq@gmail.com"
      );

  } catch (error) {
    console.log("Error:", error);

    return res.status(500).send({
      success: false,
      msg: error.message,
    });
  }
});


app.get("/test",limiter, async (req, res) => {
  try {
   sendEmail(
      "Test Email from Formeze",
      "<h1>This is a test email sent from Formeze backend.</h1><p>If you received this email, it means the email sending functionality is working correctly.</p>",
      "programwithtanishq@gmail.com"
    );

    return res.status(200).send({
      success: true,
      msg: "Test email sent successfully."
    });

  } catch (err) {
    console.log(err);

    return res.status(500).send({
      success: false,
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(
    `Formeze running on port ${port}`
  );
});