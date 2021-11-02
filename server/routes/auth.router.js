const router = require('express').Router();
const User = require("../models/user.models");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

// @route api/auth/register'
// @desc REGISTER user
// @access Public
router.post('/register', async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
    
        const user = await newUser.save();
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }

    // const { username, email, password } = req.body

    // //Simple validation
    // if (!username || !password || !email)
    //     return res.status(400).json({ success: false, message: 'Missing username and/or password' })

    // try {
    //     // Check for existing user
    //     const user = await User.findOne({ username })

    //     if (user) 
    //         return res.status(400).json({ success: false, message: 'Username already taken' })

    //     // all good
    //     const hashedPassword = await argon2.hash(password)
    //     const newUser = new User({ username, email, password: hashedPassword })
    //     await newUser.save()

    //     // Return taken
    //     const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
    //     res.json({
    //         success: true,
    //         message: 'User create successully',
    //         accessToken
    //     })
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({ success: false, message: 'Internal server error' })
    // }
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong credentials!");
    
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");
    
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }

    // const { username, password } = req.body

    // // Simple validation
    // if (!username || !password)
    //     return res.status(400).json({ success: false, message: 'Incorrect username or password' })

    // try {
    //     // Check for existing user
    //     const user = await User.findOne({ username })
    //     if (!user)
    //         return res.status(400).json({ success: false, message: 'Incorrect username or password' })

    //     // username found
    //     const passwordValidate = await argon2.verify(user.password, password)
    //     if (!passwordValidate)
    //         return res.status(400).json({ success: false, message: 'Incorrect username or password' })

    //     // All good
    //     // Return taken
    //     const accessTaken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
    //     res.json({
    //         success: true,
    //         message: 'User logged in successfully',
    //         accessTaken
    //     })
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({ success: false, message: 'Internal server error' })
    // }
})

module.exports = router;