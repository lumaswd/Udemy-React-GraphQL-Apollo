const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const Recipe = require('./models/Recipe');
const User = require('./models/User');


// Connects to the database via Mongoose and mLab

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected.'))
    .catch(err => console.error(err));



// Initializes application

const app = express();
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}.`);
});
