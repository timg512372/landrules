const express = require('express');
const Deed = require('../models/Deed');

const router = express.Router();

router.get('/', async (req, res) => {
    let deeds = [];

    try {
        usageProfiles = await Deeds.find();
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).json({
        success: true,
        usageProfiles,
    });
});

// Needs to be auth locked
router.post('/newDeed', async (req, res) => {
    return res.status(200).json({
        success: true,
    });
});

module.exports = router;
