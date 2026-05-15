const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: false,
  },
  topic: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);
Contact.createIndexes();

module.exports = Contact;
