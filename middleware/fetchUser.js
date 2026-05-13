require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET
const User = require('../models/User')

const fetchuser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({success:false, error: 'Please authenticate using a valid token' })
        return;
    }
    try {
        const data = jwt.verify(token, jwt_secret);
        req.id = data.id;
        const user = await User.findById(req.id)
        req.verified = false
        if (user.verified == true) req.verified = true
        next();
    } catch (error) {
        res.status(401).json({success:false, error: "Invalid or expired token, please re-login" })
    }
}

module.exports = fetchuser