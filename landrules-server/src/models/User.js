const mongoose = require("mongoose");

const Schema = mongoose.Schema;


let User = new Schema({
        name: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        publicAddress: {
            type: String,
            unique: true,
            allowNull: false,
        },
        role: {
            type: String
        },
        formID: {
            type: String
        }
        
        
    },
)



module.exports = mongoose.model('User', User)