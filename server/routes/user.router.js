const router = require('express').Router();
const User = require("../models/user.models");
const Post = require("../models/posts.models");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// @route api/users/:id'
// @desc PUT user
// @access Public
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password)
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json({ success: true, message: 'updated successfully', updatedUser })
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    } else {
        res.status(500).json({ success: false, message: 'You can update only your account!' })
    }
})

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

module.exports = router;