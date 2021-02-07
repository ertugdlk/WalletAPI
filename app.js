const express = require("express")
const BodyParser = require("body-parser")
const Cors = require("cors")
const _ = require("lodash")

const App = express()
App.use(BodyParser.json())
App.use(BodyParser.urlencoded({ extended: true }))
App.listen(process.env.PORT || 5000)
console.log("Tugkan API:5000 on fire !")

App.get("/", (req, res) =>
  res.json({
    msg: "tugkan API service",
  })
)

//Routes
App.use("/wallet", require("./routes/WalletRoute"))
