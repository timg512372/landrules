require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error('Invalid Email');
            }
        },
    },
    publicAddress: {
        type: String,
        unique: true,
        validate(val) {
            if (!validator.isEthereumAddress(val)) {
                throw new Error('Invalid Eth Address');
            }
        },
    },
    role: {
        type: String,
        validate(val) {
            let accepted = ['Citizen', 'Official'];
            if (!accepted.includes(val)) {
                throw new Error('Invalid Role');
            }
        },
    },
    formID: {
        type: String,
    },

    nonce: {
        type: Number,
        allowNull: false,
        default: function() {
            console.log("Create default nonce")
            return Math.floor(Math.random() * 1000000)
        }
    }
    
    // userID: {
    //     type: String,
    // }, Is this necessary??
});

module.exports = mongoose.model('User', User);
