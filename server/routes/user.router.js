const router = require('express').Router();
const User = require("../models/user.models");
const Post = require("../models/posts.models");
const bcrypt = require("bcrypt");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// @route api/users/:id'
// @desc PUT user
// @access Public
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
});

// @router api/users/:id
// @desc DELETE user
// @access Public
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("User not found!");
        }
    } else {
        res.status(401).json("You can delete only your account!");
    }
});

// @router api/users
// @desc GET user
// access Public
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others} = user._doc;
        res.status(200).json({ success: true, message: 'successfully', others });
    } catch (error) {
        res.status(500).json({ success: false, message: "Can't find the person you're lookin for" })
    }
})

module.exports = router;