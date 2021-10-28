const router = require('express').Router();
const Category = require('../models/category.models');

// @router /api/category
// @desc POST  category
// access Private
router.post('/', async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCategory = await newCat.save();

        res.status(200).json({ success: true, message: 'create categories completed', savedCategory });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @router /api/category
// @desc GET  category
// access Private
router.get('/', async (req, res) => {
    try {
        const cats = await Category.find();

        res.status(200).json({ success: true, message: 'get catalog successfully', cats });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


module.exports = router;