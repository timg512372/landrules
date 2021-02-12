require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

let Deed = new Schema({
    name: {
        type: String,
        required: true,
    },
    deedId: {
        type: Number,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        validate(val) {
            let accepted = ['P', 'C', 'R', 'D'];
            if (!accepted.includes(val)) {
                throw new Error(
                    'Invalid Status: Must be P = Pending, C = Confirmed, R = Rejected, or D = Disputed'
                );
            }
        },
    },
    comments: {
        type: String,
    },
    coordinates: {
        type: Array,
        required: true,
    },
    pdfJson: {
        type: String,
        validate(val) {
            if (!validator.isJSON(val)) {
                throw new Error('Invalid PDF JSON');
            }
        },
    },
});

module.exports = mongoose.model('Deed', Deed);
