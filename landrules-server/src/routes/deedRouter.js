const express = require('express');
const Deed = require('../models/Deed');
const sha256 = require('js-sha256');
const fs = require('fs');
const Anvil = require('@anvilco/anvil');

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

router.get('/getDeedByOwner', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).send('User address not found');
    }

    const { web3, contractInstance } = initializeWeb3();
    let deeds = [];
    try {
        let deedArray = await contractInstance.methods.getDeedByOwner(address).call();
        let promises = deedArray.map(async (deedId) => {
            let sc = await contractInstance.methods.deedArray(deedId).call();
            let db = await Deed.findOne({ deedId });

            db.tampered =
                sha256(db.pdfJson) != sc.jsonHash ||
                JSON.stringify(db.coordinates) != sc.coordinates;

            return db;
        });

        deeds = await Promise.all(promises);
    } catch (e) {
        console.log(e);
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
    const { deedId } = req.query;
    if (!deedId) {
        return res.status(400).send('Deed ID not found');
    }
    try {
        let query = await Deed.findOne({ deedId });

        if (!query) {
            return res.status(400).send('Deed does not exist');
        }

        let json = JSON.parse(query.pdfJson);

        const anvilClient = new Anvil({ apiKey: process.env.ANVIL });
        const { statusCode, data } = await anvilClient.generatePDF(json);

        // Data will be the filled PDF raw bytes
        let fileName = sha256(Date.now().toString());
        fs.writeFileSync(`pdfs/${fileName}.pdf`, data, { encoding: null });

        res.download(`pdfs/${fileName}.pdf`, `${query.name}.pdf`);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
    }
});

module.exports = router;
