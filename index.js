require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const dns = require("dns");

const { BrevoClient } = require("@getbrevo/brevo");

const connectToMongo = require("./db");
const Contact = require("./models/Contact");

dns.setDefaultResultOrder("ipv4first");

const app = express();
const port = 5000;

connectToMongo();

/* =========================
   BREVO SETUP
========================= */

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API,
});

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.options("/*splat", cors());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
});

app.use("/f", limiter);

/* =========================
   ROUTES
========================= */

app.use("/api/auth", require("./routes/auth"));

app.use("/", require("./routes/form"));

/* =========================
   STATUS ROUTE
========================= */

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

/* =========================
   CONTACT ROUTE
========================= */

app.post("/contact", async (req, res) => {
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
    // SAVE TO DATABASE
    await Contact.create({
      name,
      email,
      company,
      topic,
      message,
      created_at: new Date(),
    });

    // SEND EMAIL
    const data = await brevo.transactionalEmails.sendTransacEmail({
      subject: `New Contact Form Submission - ${topic}`,
      htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      sender: {
        name: "Formeze",
        email: "formeze.service@gmail.com",
      },
      to: [
        {
          email: "programwithtanishq@gmail.com",
        },
      ],
    });

    console.log(data);

    return res.status(200).send({
      success: true,
      msg: "Message received successfully.",
    });

  } catch (error) {
    console.log("Error:", error);

    return res.status(500).send({
      success: false,
      msg: error.message,
    });
  }
});

/* =========================
   TEST EMAIL ROUTE
========================= */

app.get("/test", async (req, res) => {
  try {
    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: "TEST MAIL",
      htmlContent: `
        <h1>HELLO WORLD</h1>
        <p>Brevo email working successfully.</p>
      `,
      sender: {
        name: "Formeze",
        email: "formeze.service@gmail.com",
      },
      to: [
        {
          email: "tanishq001verma08@gmail.com",
          name: "Tanishq Verma",
        },
      ],
    });

    return res.status(200).send({
      success: true,
      msg: "Test email sent successfully.",
      result,
    });

  } catch (err) {
    console.log(err);

    return res.status(500).send({
      success: false,
      error: err.message,
    });
  }
});

/* =========================
   START SERVER
========================= */

app.listen(port, () => {
  console.log(
    `Formeze running on port ${port}`
  );
});