const Express = require("express")
const BodyParser = require("body-parser")
const Cors = require("cors")
const binanceAPI = require("./APIs/binanceAPI")

const App = Express()
App.use(BodyParser.json())
App.use(BodyParser.urlencoded({ extended: true }))
App.listen(5000)
console.log("Tugkan API:5000 on fire !")

App.get("/", (req, res) =>
  res.json({
    msg: "tugkan API service",
  })
)

//BINANCE
//POST request body => {apikey, secretkey}
App.post("/binance/wallet", async (req, res) => {
  const secretkey = req.body.secretkey
  const apikey = req.body.apikey
  const response = await binanceAPI.getWallet(secretkey, apikey)
  res.send(response)
})
