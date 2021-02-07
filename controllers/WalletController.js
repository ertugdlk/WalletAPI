const binanceAPI = require("../APIs/binanceAPI")
const _ = require("lodash")

var wallet_functions = { binance: binanceAPI.getWallet }

class WalletController {
  static async getWallet(req, res) {
    try {
      var results = []

      const array = req.body
      await Promise.all(
        array.map(async (provider) => {
          const wallet_function = wallet_functions[provider.name]

          if (wallet_function) {
            const response_ = await wallet_function(
              provider.secretkey,
              provider.apikey
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
}

module.exports = WalletController
