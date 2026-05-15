require('dotenv').config()
const express = require('express')
const cors = require("cors");
const rateLimit = require("express-rate-limit")
const app = express()
const port = 5000
const connectToMongo = require('./db')
const Contact = require('./models/Contact')
const nodemailer = require("nodemailer");

connectToMongo()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.options("/*splat", cors());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5, 
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.use("/f", limiter);

app.use('/api/auth', require('./routes/Auth'))
app.use('/', require('./routes/form'))

app.get('/status', (req,res)=>{
   try {
      res.status(200).send({success:true, msg:'OK'})
   } catch (error) {
      res.status(501).send({success:false, msg: error})
   }
})

app.post('/contact', async (req,res)=>{

   const {name, email, company, topic, message} = req.body
  if(!name || !email || !topic || !message) return res.status(400).send({success:false, msg: "Please fill all required fields."})

   try {
      await Contact.create({
         name, email, company, topic, message, created_at: new Date()
      })
      transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
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
      },
      (err, info) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err.message,
          });
        }
      },
    );
      res.status(200).send({success:true, msg:'Message received successfully.'})
   }  
   catch (error) {
      res.status(501).send({success:false, msg: error})
   }
})

app.listen(port, () => {
   console.log(`Formeze running on port ${port}`)
})  