const Cors = require("cors");
const _ = require("lodash");

const express = require("express");
const BodyParser = require("body-parser");
const mongoClient = require('./database/config');

const App = express();

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: true }));

mongoClient.connect()
    .then(() => {
      const port = process.env.PORT || 5000;
      const portStatus = 'Listening on port ' + port;

      App.listen(port);
      console.log(portStatus);  

      App.get("/", (req, res) => res.json({ msg: "tugkan API service"}));

      //Routes
      App.use("/wallet", require("./routes/WalletRoute"));
});
