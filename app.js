/* eslint-disable no-console */

const cors = require('cors');
const _ = require('lodash');

const express = require('express');
const BodyParser = require('body-parser');

const walletRoute = require('./source/routes/WalletRoute');
const commonRoute = require('./source/routes/CommonRoute');

const { connectToMongoDb } = require('./source/database/config');
const { SERVER_RUNNING_CORRECTLY } = require('./source/variables/responses');

const { updateDatabase } = require('./source/cron/marketData');

const app = express();

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

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

connectToMongoDb();
startExpress();
updateDatabase.start();
