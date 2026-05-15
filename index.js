require('dotenv').config()
const express = require('express')
const cors = require("cors");
const rateLimit = require("express-rate-limit")
const app = express()
const port = 5000
const connectToMongo = require('./db')
const Contact = require('./models/Contact')
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY)

connectToMongo()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.options("/*splat", cors());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5, 
});


app.use("/f", limiter);

app.use('/api/auth', require('./routes/auth'))
app.use('/', require('./routes/form'))

app.get('/status', (req,res)=>{
   try {
      res.status(200).send({success:true, msg:'OK'})
   } catch (error) {
      res.status(501).send({success:false, msg: error})
   }
})



app.post('/contact', async (req, res) => {

  const { name, email, company, topic, message } = req.body;

  if (!name || !email || !topic || !message) {
    return res.status(400).send({
      success: false,
      msg: "Please fill all required fields."
    });
  }

  try {
    await Contact.create({
      name,
      email,
      company,
      topic,
      message,
      created_at: new Date()
    });

    const data = await resend.emails.send({
      from: "Formeze <onboarding@resend.dev>",
      to: "programwithtanishq@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });


    return res.status(200).send({
      success: true,
      msg: "Message received successfully."
    });

  } catch (error) {
    console.log("Error:", error);

    return res.status(500).send({
      success: false,
      msg: error.message
    });
  }
});
app.get('/test', async (req, res) => {
  try {
    const result = await resend.emails.send({
      from: "Formeze <onboarding@resend.dev>",
      to: "programwithtanishq@gmail.com",
      subject: "TEST MAIL",
      html: "<p>HELLO WORLD, TEST MAIL</p>",
    });

    return res.status(200).send({
      success: true,
      msg: "Test email sent successfully.",
      result
    });

  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false });
  }
});
app.listen(port, () => {
   console.log(`Formeze running on port ${port}`)
})  