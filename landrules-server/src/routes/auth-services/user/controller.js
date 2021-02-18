const express = require('express');
const axios = require('axios')
require('dotenv').config();
const TypingDNAClient = require('../../../typingdnaclient.js')
const User = require('../../../models/User.js');
const TypingDNA = new TypingDNAClient(process.env.TYPINGDNA_KEY, process.env.TYPINGDNA_SECRET, '192.168.1.102');

const find = async (req, res, next) => {
    // If a query string ?publicAddress=... is given, then filter results
    console.log('finding publicAddress');
    console.log(req.query.publicAddress);
    let publicAddress = req.query.publicAddress
    const user = await User.find({publicAddress: publicAddress})
    console.log('user' + user)
	return res.status(200).json({user})

};

function callback(res) {
    return res
}

const get = (req, res, next) => {
    // AccessToken payload is in req.user.payload, especially its `id` field
    // UserId is the param in /users/:userId
    // We only allow user accessing herself, i.e. require payload.id==userId
    if (req.user.payload.id !== +req.params.userId) {
        return res.status(401).send({ error: 'You can can only access yourself' });
    }
   
    return User.findByPk(req.params.userId)
        .then((user) => res.json(user))
        .catch(next);
};

const check = async (req, res, next) => {
    let typingPattern = req.body.tp;
    let userID = req.body.publicAddress;
    console.log('checking')
    
    var base_url = 'https://api.typingdna.com';
    var apiKey = process.env.TYPINGDNA_KEY;
    var apiSecret = process.env.TYPINGDNA_SECRET;
    var id = userID;
    var data = {
    tp : typingPattern,
    }

    var typingResult = await axios({
        method: 'post',
        url: base_url + '/auto/' + id,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': 'Basic ' + new Buffer(apiKey + ':' + apiSecret).toString('base64'),
        },
        data: data
    }).catch(console.log);
    
    const result = typingResult.data
    console.log(result)
    
    return res.status(201).send(result)
}

var typingResult =  async (tp, _callback, userId) => {
    var base_url = 'https://api.typingdna.com';
    var apiKey = process.env.TYPINGDNA_KEY;
    var apiSecret = process.env.TYPINGDNA_SECRET;
    var id = userId;
    var data = {
        tp : tp,
        }
    var getTyping = await axios({
        method: 'post',
        url: base_url + '/auto/' + id,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': 'Basic ' + new Buffer(apiKey + ':' + apiSecret).toString('base64'),
        },
        data: data
    }).then( await  wait(3000));
    const result = getTyping
    _callback()
    return result.data

}

var callback = ()  => {
    return true
}

function wait(ms) {
    return new Promise( (resolve) => {setTimeout(resolve, ms)});
}


const create = async (req, res, next) => {
    let name = req.body.name;
    let publicAddress = req.body.publicAddress.toLowerCase();
    let email = req.body.email;
    let role = req.body.role;
    let formID = req.body.formID;
	console.log('name: ' + name)
	console.log('publicAddress: ' + publicAddress)
	console.log('email: ' + email)
	console.log('role: ' + role)
	console.log('formID: ' + formID)
    let newUser = new User({
        name: name,
        email: email,
        publicAddress: publicAddress,
        role: role,
        formID: formID,
    });
    newUser
        .save()
        .then((newUser) => res.json((data = newUser)))
        .catch((err) => console.log(err));
    let userId = publicAddress;

    let typingPattern1 = req.body.tp1;
    let typingPattern2 = req.body.tp2;
    let typingPattern3 = req.body.tp3;
    let options = req.body.options;
    //calls the typing dna class to enroll the user
	//console.log(TypingDNA.auto)
    //let saveUser1 = TypingDNA.auto(userId, typingPattern1, options, callback);
    //let saveUser2 = TypingDNA.auto(userId, typingPattern2, options, callback);
    //let saveUser3 = TypingDNA.auto(userId, typingPattern3, options, callback);

    
    
    let saveUser1 = await typingResult(typingPattern1, callback, userId)
    console.log(saveUser1)
    let saveUser2 = await typingResult(typingPattern2, callback, userId)
    console.log(saveUser2)
    let saveUser3 = await typingResult(typingPattern3, callback, userId)
    console.log(saveUser3)
    console.log('user created');
	return "user created"
}

const patch = (req, res, next) => {
    // Only allow to fetch current user
    if (req.user.payload.id !== +req.params.userId) {
        return res.status(401).send({ error: 'You can can only access yourself' });
    }
    return User.findByPk(req.params.userId)
        .then((user) => {
            if (!user) {
                return user;
            }

            Object.assign(user, req.body);
            return user.save();
        })
        .then((user) => {
            return user
                ? res.json(user)
                : res.status(401).send({
                      error: `User with publicAddress ${req.params.userId} is not found in database`,
                  });
        })
        .catch(next);
};
let functions = { find, get, check, create, patch };
module.exports = functions;
