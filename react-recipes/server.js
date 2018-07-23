const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Middleware
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');



// *** *** *** *** *** *** ***
// Models defined with Mongoose

const Recipe = require('./models/Recipe');
const User = require('./models/User');



// *** *** *** *** *** *** ***
// GraphQL Schmema

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});



// *** *** *** *** *** *** ***
// Connects to the database via Mongoose and mLab

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected.'))
    .catch(err => console.error(err));



// *** *** *** *** *** *** ***
// Initializes application

const app = express();
const endpointURL = '/graphql';

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOptions))


// *** *** *** *** *** *** ***
// Setup JWT authentication middleware

app.use(async (req, res, next) => {
    const token = req.headers['authorization'];
    if (token !== "null") {
        try {
            const currentUser = await jwt.verify(token, process.env.SECRET);
            console.log(currentUser);
        } catch (err) {
            console.error(err);
        }
    }
    next();
});



// *** *** *** *** *** *** ***
// GraphQL Setup

app.use('/graphiql', graphiqlExpress({ endpointURL }));
app.use(endpointURL, bodyParser.json(), graphqlExpress({
    schema,
    context: { // Adding Monoose Models to GraphQL
        Recipe,
        User
    }
}));



const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}.`);
});
