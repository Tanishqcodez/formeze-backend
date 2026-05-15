require('dotenv').config()
const express = require('express')
const cors = require("cors");
const rateLimit = require("express-rate-limit")
const app = express()
const port = 5000
const connectToMongo = require('./db')
const Contact = require('./models/Contact')
const nodemailer = require("nodemailer");
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

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
 port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
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
        console.log(info)
        if (err) {
          console.log("Error sending email:", err);
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

app.get('/test' , async (req,res)=>{
    await transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: "programwithtanishq@gmail.com",
        subject: "New Contact Form Submission",
        html: 'TESTING MAIL',
      },
    ).then(info => {
      console.log(info)
    }).catch(err => {
      console.log(err)
    })
    return res.status(200).send({success:true, msg:'Test email sent successfully.'})
})

app.listen(port, () => {
   console.log(`Formeze running on port ${port}`)
})  