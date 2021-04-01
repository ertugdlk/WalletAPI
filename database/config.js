const { MongoClient } = require("mongodb");
const { userName, password } = require('./variables');

const uri = 'mongodb+srv://' + 
    userName + 
    ':' + 
    password + 
    '@walletapi.8v5nm.mongodb.net/test?retryWrites=true&w=majority';

const mongoClient = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoClient;
