const Axios = require("axios")
const _ = require("lodash")
const crypto = require("crypto")

class binanceAPI {
  async getWallet(secretkey, apikey) {
    const timeresponse = await Axios.get("https://api3.binance.com/api/v3/time")
    const sharedSecret = secretkey
    const timestamp = timeresponse.data.serverTime
    const query = "recvWindow=60000&timestamp=" + timestamp

    //Create signature with hashed secretkey and parameters
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
          "X-MBX-APIKEY": apikey,
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
  }
}

module.exports = new binanceAPI()
