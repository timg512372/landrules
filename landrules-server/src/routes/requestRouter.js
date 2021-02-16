const express = require('express');
require('dotenv').config();

const router = express.Router();
const Deed = require('../models/Deed.js');


router.get('/', (req, res) => {
    return res.status(200).send("LandRules Request Router")
});


router.post('/sendRequest', (req, res) => {
    let id = req.body.ID;
    let shipID = req.body.ShipmentID;
    let date = req.body.Date;
    let orderID = req.body.Order;
    let quant = req.body.Quantity;
    let user = req.body.Client;
    let tag = req.body.Tag;
    let newRequest = new Request({
        ID: id,
        ShipmentID: shipID,
        Date: date,
        Order: orderID,
        Quantity: quant,
        Client: user,
        Tag: tag,
    });
    newRequest
        .save()
        .then((newRequest) => res.json((data = newRequest)))
        .catch((err) => console.log(err));

    return res.json({
        success: true,
    });
});

//Get history of all requests
router.get('/getRequests', async (req, res) => {
    try {
        let requests = await Deed.find({}).sort({ Quantity: -1 });
        return res.status(200).json({requests});
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

//Get all requests for a single user 
router.get('/getRequestsByOwner', async (req, res) => {
    let publicAddress = req.query.publicAddress
    try {
        let requests = await Request.find({ publicAddress : publicAddress }).sort({ Quantity: -1 });
        return res.status(200).json({ requests });
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

//Gets a certain type of request(All pending, all approved, all denied) NOT FUNCTIONAL YET
router.get('/getAllPending', async (req, res) => {
    try {
        let requests = await Request.find({ Tag: ['PENDING'] }).sort({ Quantity: -1 });
        return res.status(200).json({ requests });
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

//Gets a request by its key
router.patch('/approve', async (req, res) => {
    let id = req.body._id;
    try {
        let curr = await Request.findById(id);
        curr.Tag = ['APPROVED'];
        await curr.save();
        return res.status(200).json({ curr });
    } catch (err) {
        res.send(err)
    }
});

router.patch('/reject', async (req, res) => {
    let id = req.body._id;
    try {
        let curr = await Request.findById(id);
        curr.Tag = ['REJECTED'];
        await curr.save();
    } catch (err) {
        res.send(err)
    }
    });

   


module.exports = router;
