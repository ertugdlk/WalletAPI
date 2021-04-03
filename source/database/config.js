const { MongoClient } = require('mongodb');
const { userName, password } = require('./variables');

const {
    MONGODB_CONNECT_ERROR,
    MONGODB_CONNECTED,
} = require('../variables/responses');

const uri = `mongodb+srv://${
    userName
    }:${
    password
    }@walletapi.8v5nm.mongodb.net/test?retryWrites=true&w=majority`;

const mongoClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

function connectToMongoDb() {
    try {
        mongoClient.connect();
        console.log(MONGODB_CONNECTED);
    } catch (error) {
        console.log(MONGODB_CONNECT_ERROR);
        throw error;
    }
}

module.exports = {
    connectToMongoDb,
    mongoClient,
};
