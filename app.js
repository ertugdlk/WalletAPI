const cors = require("cors");
const _ = require("lodash");

const express = require("express");
const BodyParser = require("body-parser");
const mongoClient = require('./database/config');

const { MONGODB_CONNECT_ERROR } = require('./source/variables/errors');


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
  const portStatus = 'Listening on port ' + port;

  app.listen(port);
  console.log(portStatus);  

  app.get("/", (req, res) => res.json({ msg: "tugkan API service"}));

  //Routes
  app.use("/wallet", require("./routes/WalletRoute"));
}

startMongoDb();
startExpress();
