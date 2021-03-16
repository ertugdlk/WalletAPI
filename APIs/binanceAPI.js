const Axios = require("axios")
const _ = require("lodash")
const crypto = require("crypto")

class binanceAPI {
  async getWallet(secretKey, apiKey) {
    try {
      const timeresponse = await Axios.get(
        "https://api3.binance.com/api/v3/time"
      )
      const sharedSecret = secretKey
      const timestamp = timeresponse.data.serverTime
      const query = "recvWindow=60000&timestamp=" + timestamp

      //Create signature with hashed secretKey and parameters
      const signature = crypto
        .createHmac("sha256", sharedSecret)
        .update(query)
        .digest("hex")

      //Binance API account wallet information request
      const response = await Axios.get(
        "https://api3.binance.com/api/v3/account?recvWindow=60000&timestamp=" +
          timestamp +
          "&signature=" +
          signature,
        {
          headers: {
            "X-MBX-apiKey": apiKey,
          },
        }
      )

      //Filter results more than 0
      const balances = response.data.balances
      const filteredResults = _.filter(balances, (coin) => {
        const free = parseFloat(coin.free)
        const locked = parseFloat(coin.locked)
        return free + locked > 0
      })

      return filteredResults
    } catch (error) {
      if (error.response) {
        return { status: error.response.status, msg: error.response.msg }
        /*
        console.log(error.response.data)
        console.log(error.response.status)
        */
      } else if (error.request) {
        //console.log(error.request)
      } else {
        //console.log("Error", error.message)
      }
      //console.log(error)
    }
  }
}

module.exports = new binanceAPI()
