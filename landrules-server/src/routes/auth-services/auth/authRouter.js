const express = require('express');
require('dotenv').config();
const router = express.Router();
//const User = require('../../../models/Accounts.js'); 
const controller = require('./controller.js')

/** POST /api/auth */
router.route('/').post(controller.create);

module.exports = router;