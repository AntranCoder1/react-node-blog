const router = require('express').Router();
const User = require("../models/user.models");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// @route api/auth/register'
// @desc user
// @access Public
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    //Simple validation
    if (!username || !password || !email)
        return res.status(400).json({ success: false, message: 'Missing username and/or password' })

    try {
        // Check for existing user
        const user = await User.findOne({ username })

        if (user) 
            return res.status(400).json({ success: false, message: 'Username already taken' })

        // all good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()

        // Return taken
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: 'User create successully',
            accessToken
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

})

// LOGIN

module.exports = router;