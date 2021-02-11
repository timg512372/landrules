require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const authRouter = require('./routes/auth-services/auth/authRouter');
// const userRouter = require('./routes/auth-services/user/userRouter.js');
const deedRouter = require('./routes/deedRouter');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT ? process.env.PORT : 4000;

mongoose.connect(process.env.MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log('DB connected successfully!');
});
db.on('error', (err) => {
    console.error(`Error while connecting to DB: ${err.message}`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

//use auth router
// one of the below is broken
// app.use('/api/auth/', authRouter);
// app.use('/api/auth/users/', userRouter);
app.use('/api/deed/', deedRouter);

module.exports = { app };

// //require metamask
// const Web3 = require("web3");
// const ethEnabled = () => {
//   if (window.ethereum) {
//     window.web3 = new Web3(window.ethereum);
//     window.ethereum.enable();
//     return true;
//   }
//   return false;
// } Probably not necessary
