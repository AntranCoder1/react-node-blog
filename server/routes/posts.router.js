const router = require('express').Router();
const User = require("../models/user.models");
const Post = require("../models/posts.models");

// @router api/post
// @desc CREATE post
// @access Private
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json({ success: true, message: 'create new post successfully', post: savedPost })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// @router api/post/:id
// @desc UPDATE post
// @access Private
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id, {
                        $set: req.body
                    },
                    { new: true }
                );

                res.status(200).json({ success: true, message: 'Updated completed', post: updatedPost })
            } catch (error) {
                console.log(error);
                res.status(401).json({ success: false, message: 'You can updated only your post!' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

// @router api/post/:id
// desc DELETE post
// @access Private
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();

                res.status(200).json({ success: true, message: 'Deleted completed' });
            } catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: 'You can deleted only your post!' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

// @router api/post/:id
// @desc GET post
// @access Private
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        res.status(200).json({ success: true, message: 'Completed', post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

// @router api/post/
// @desc GET All post
// @access Private
router.get('/', async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;

    try {
        let posts;

        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({ 
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
        }

        res.status(200).json({ success: true, message: 'Completed', posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

module.exports = router;