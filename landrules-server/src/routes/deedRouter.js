const express = require('express');
const Deed = require('../models/Deed');
const { initializeWeb3 } = require('../utils/blockchainUtils');
const router = express.Router();

router.get('/', async (req, res) => {
    let deeds = [];

    try {
        deeds = await Deed.find();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).json({
        success: true,
        deeds,
    });
});

// Needs to be auth locked
router.post('/newDeed', async (req, res) => {
    const { name, comments, coordinates } = req.body;

    if (!name) {
        return res.status(400).send('Deed name not found');
    } else if (!coordinates) return res.status(400).send('Coordinates not found');

    // Add the blockchain stuff here

    try {
        let newDeed = new Deed({ name, coordinates, status: 'P', comments, deedId: 1 });
        await newDeed.save();
    } catch (e) {
        return res.status(500).send(e.message);
    }

    return res.status(200).json({
        success: true,
    });
});

module.exports = router;
