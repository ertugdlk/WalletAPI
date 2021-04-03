/* eslint-disable no-console */

const cors = require('cors');
const _ = require('lodash');

const express = require('express');
const BodyParser = require('body-parser');
const mongoClient = require('./source/database/config');

const walletRoute = require('./source/routes/WalletRoute');
const commonRoute = require('./source/routes/CommonRoute');

const {
  MONGODB_CONNECT_ERROR,
  SERVER_RUNNING_CORRECTLY,
} = require('./source/variables/responses');

const app = express();

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

async function startMongoDb() {
  try {
    await mongoClient.connect();
  } catch (error) {
    console.log(MONGODB_CONNECT_ERROR, error);
  }
}

async function startExpress() {
  const port = process.env.PORT || 5000;
  const portStatus = `Listening on port ${port}`;

  app.listen(port);
  console.log(portStatus);

  app.get('/', (req, res) => res.json({ msg: SERVER_RUNNING_CORRECTLY }));

  // Routes
  app.use('/wallet', walletRoute);
  app.use('/common', commonRoute);
}

startMongoDb();
startExpress();
