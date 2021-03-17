const binanceAPI = require("../APIs/binanceAPI");
const ftxAPI = require("../APIs/ftxAPI");
const BitmaxApi = require("../APIs/bitmaxAPI");

const _ = require("lodash")

var wallet_functions = {
    binance: binanceAPI.getWallet,
    ftx: ftxAPI.getWallet,
    bitmax: BitmaxApi.getWallet
}

class WalletController {
  static async getWallet(req, res) {
    try {
      var results = []

      const array = req.body
      await Promise.all(
        array.map(async (provider) => {

          //Checking valid provider or not
          if(!wallet_functions[provider.provider]){
            res.send({ status: 400, msg: "invalid provider" })
            res.end()
          }
          const wallet_function = wallet_functions[provider.provider]

          if (wallet_function) {
            const response_ = await wallet_function(
              provider.secretKey,
              provider.apiKey
            )
            results.push(response_)
          }
        })
      )
      res.send(results)
    } catch (error) {
      throw error
    }
  }

  static async controlKeys(req, res) {
    try {
      //Request body variables
      const provider = req.body.provider
      const secretKey = req.body.secretKey
      const apiKey = req.body.apiKey

      //Checking valid provider or not
      if(!wallet_functions[provider]){
        res.send({ status: 400, msg: "invalid provider" })
        res.end()
      }

      const wallet_function = wallet_functions[provider]
      const response_ = await wallet_function(secretKey, apiKey)
      if (response_.status == 401) {
        res.send(response_)
      } else {
        res.send({ status: 200, msg: "verified key" })
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = WalletController
