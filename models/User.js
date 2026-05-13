    const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    resetPasswordToken:{
        type: String,
        required: false,
        default: ''
    },
    verificationToken:{
        type: String,
        required: false,
        default: ''
    },
    verificationTokenExpiry:{
        type: Date,
    },
    verified:{
        type: Boolean,
        required: true
    },
    created_at:{
        type: Date,
        required:true
    }
})

const User = mongoose.model('User', UserSchema);
User.createIndexes();


module.exports = User