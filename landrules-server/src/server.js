require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT ? process.env.PORT : 4000;

mongoose.connect(process.env.MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log('DB connected successfully!');
});
db.on('error', (err) => {
    console.error(`Error while connecting to DB: ${err.message}`);
});

const app = express();
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = { app };
