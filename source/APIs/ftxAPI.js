const Axios = require("axios")
const _ = require("lodash")
const crypto = require("crypto")

class ftxAPI {
  async getWallet(secretkey, apikey) {
    try {
      const baseurl = "https://ftx.com/api"
      const timeresponse = await Axios.get(
        "https://otc.ftx.com/api/time"
      )
      const sharedSecret = secretkey
      const timestamp = Date.parse(timeresponse.result)
      const query = timestamp+"GET/api/wallet/all_balances"

      //Create signature with hashed secretkey and parameters
      const signature = crypto
        .createHmac("sha256", sharedSecret)
        .update(query)
        .digest("hex")

      //Binance API account wallet information request
      const response = await Axios.get(
        baseurl +'/wallet/all_balances',
        {
          headers: {
            'FTX-KEY': apikey,
            'FTX-SIGN': signature,
            'FTX-TS':timestamp,
          },
        }
      )

      return response.data.result.main

    } catch (error) {
      throw error
    }
  }
}

module.exports = new ftxAPI()
