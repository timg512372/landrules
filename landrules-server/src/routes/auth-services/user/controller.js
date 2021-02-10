const express = require('express')

const User = require('../../../models/Accounts.js'); 


const find = (req, res, next) => {
    // If a query string ?publicAddress=... is given, then filter results
    console.log("finding publicAddress")
	console.log(req.query.publicAddress)
	return User.find({publicAddress: req.query.publicAddress})
		.then((users) => res.json(users))
		.catch(next);
};

const get = (req, res, next) => {
	// AccessToken payload is in req.user.payload, especially its `id` field
	// UserId is the param in /users/:userId
	// We only allow user accessing herself, i.e. require payload.id==userId
	if ((req).user.payload.id !== +req.params.userId) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
	}
	return User.findByPk(req.params.userId)
		.then((user) => res.json(user))
		.catch(next);
};

const create = (req, res, next) => {
	let name = req.body.name;
    let publicAddress = req.body.publicAddress;
	let email = req.body.email;
	let role = req.body.role;
    let formID = req.body.formID;
    let newUser = new User({
        name: name,
        email: email,
		publicAddress: publicAddress,
		role: role,
        formID: formID
		
    })
    newUser.save().then(newUser => res.json(data = newUser)).catch(err => console.log(err))
	console.log("user created")
}


const patch = (req, res, next) => {
	// Only allow to fetch current user
	if ((req).user.payload.id !== +req.params.userId) {
		return res
			.status(401)
			.send({ error: 'You can can only access yourself' });
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
let functions = {find, get, create, patch}
module.exports = functions;