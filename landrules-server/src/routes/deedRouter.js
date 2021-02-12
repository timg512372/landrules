const express = require('express');
const Deed = require('../models/Deed');
const { initializeWeb3 } = require('../utils/blockchainUtils');
const router = express.Router();
const sha256 = require('js-sha256');

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

router.get('/getDeedByOwner', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).send('User address not found');
    }

    const { web3, contractInstance } = initializeWeb3();
    let deeds = [];
    try {
        deeds = await contractInstance.methods.getDeedByOwner(address).call();
        console.log(deeds);
    } catch (e) {
        return res.status(500).send(e);
    }

    return res.status(200).json({
        success: true,
        deeds,
    });
});

// Needs to be auth locked
router.post('/newDeed', async (req, res) => {
    const { name, comments, coordinates, json } = req.body;

    if (!name) {
        return res.status(400).send('Deed name not found');
    } else if (!coordinates) {
        return res.status(400).send('Coordinates not found');
    }

    const { web3, contractInstance } = initializeWeb3();
    const accounts = await web3.eth.getAccounts();

    try {
        console.log('starting event');
        const event = await contractInstance.methods
            .newDeed(name, sha256(JSON.stringify(json)), JSON.stringify(coordinates))
            .send({ from: accounts[0] });

        console.log('finished sc stuff');

        const deedId = event.events.CreateDeed.returnValues.deedId;

        let newDeed = new Deed({
            name,
            coordinates,
            status: 'P',
            comments,
            deedId,
            pdfJson: JSON.stringify(json),
        });
        await newDeed.save();

        console.log(deedId);
        // await contractInstance.methods.transferDeed(id, address).send({ from: accounts[0], gasPrice: '100'})
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).json({
        success: true,
    });
});

router.get('/pdf', async (req, res) => {
    const { deedId } = req.body;
    if (!deedId) {
        return res.status(400).send('User address not found');
    }
    try {
        let query = await Deed.findOne({ deedId });
        data = JSON.parse(query.pdfJson);

        const anvilClient = new Anvil({ apiKey: process.env.ANVIL });
        const { statusCode, data } = await anvilClient.generatePDF(exampleData);
        console.log(statusCode); // => 200
        // Data will be the filled PDF raw bytes
        fs.writeFileSync('output.pdf', data, { encoding: null });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }

    return res.status(200).json({ success: true });
});

module.exports = router;
