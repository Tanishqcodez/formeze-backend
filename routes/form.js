require("dotenv").config();
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const mongoose = require("mongoose");

router.post("/message", fetchuser, async (req, res) => {
    if (req.verified == false) return res.status(401).send({success:false, msg:"Please verify your account before using the service."})
  try {
    const collection = mongoose.connection.db.collection("messages");

    await collection.insertOne({
      ...req.body,
      userId: req.id,
      createdAt: new Date(),
    });

    res.json({
      success: true,
      msg: "Sent Successfully"
    });

  } catch (error) {
    res.status(500).send({success:false, msg:"Server Error"});
  }
});

router.get('/fetch', fetchuser, async(req,res)=>{
    if (req.verified == false) return res.status(401).send({success:false, msg:"Please verify your account before using the service."})
    try {
        const collection = mongoose.connection.db.collection("messages");
        const document = await collection.find({userId:req.id}).toArray()
        return res.status(200).send({success:true, document})
    } catch (error) {
        console.log(error)
         res.status(500).send({success:false, msg:"Server Error"});
    }
})

router.delete('/delete/:id', fetchuser, async (req,res)=>{
   const id = req.params.id
    if(!id) return res.status(404).send({success:false, msg:"Message ID not found."})
    if (req.verified == false) return res.status(401).send({success:false, msg:"Please verify your account before using the service."})
    
    try {
        const collection = mongoose.connection.db.collection("messages");
        const objectId = new mongoose.Types.ObjectId(id);
        const document = await collection.findOneAndDelete({_id :objectId})
        if(!document) return res.status(404).send({success:false, msg:"Not Valid ID."})
        
        return res.status(200).send({success:true,msg:"Deleted Successfully!"})
    } catch (error) {
        console.log(error)
         res.status(500).send({success:false, msg:"Server Error"});
    }
})

module.exports = router;