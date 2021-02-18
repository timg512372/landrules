const typingDNA = require('../../../typingdnaclient.js')

//deal with routes
const express = require('express');
//import jwt from 'express-jwt';

//use this syntax unless you have bable
//const config = require('../../config');
const controller = require('./controller');
const router = express.Router();

/** GET /api/users */
router.route('/').get(controller.find);

/** GET /api/users/:userId */
/** Authenticated route */
//router.route('/:userId').get(jwt(config), controller.get);

/** POST api/users/typing */
//router.route('/typing').post(controller.check);
router.post('/typing', controller.check)

/** POST /api/users */
router.route('/').post(controller.create);

/** PATCH /api/users/:userId */
/** Authenticated route */
//router.route('/:userId').patch(jwt(config), controller.patch);

module.exports = router;