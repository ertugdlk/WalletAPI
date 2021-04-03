const _ = require('lodash');

const binanceAPI = require('../APIs/binanceAPI');
const ftxAPI = require('../APIs/ftxAPI');
const BitmaxApi = require('../APIs/bitmaxAPI');

const walletFunctions = {
    binance: binanceAPI.getWallet,
    ftx: ftxAPI.getWallet,
    bitmax: BitmaxApi.getWallet,
};

class WalletController {
  static async getWallet(req, res) {
    try {
      const results = [];

      const array = req.body;
      await Promise.all(
        array.map(async (provider) => {
          // Checking valid provider or not
          if (!walletFunctions[provider.provider]) {
            res.send({ status: 400, msg: 'invalid provider' });
            res.end();
          }
          const wallet_function = walletFunctions[provider.provider];

          if (wallet_function) {
            const response_ = await wallet_function(
              provider.secretKey,
              provider.apiKey,
            );
            results.push(response_);
          }
        }),
      );
      res.send(results);
    } catch (error) {
      throw error;
    }
  }

  static async controlKeys(req, res) {
    try {
      // Request body variables
      const { provider } = req.body;
      const { secretKey } = req.body;
      const { apiKey } = req.body;

      // Checking valid provider or not
      if (!walletFunctions[provider]) {
        res.send({ status: 400, msg: 'invalid provider' });
        res.end();
      }

      const wallet_function = walletFunctions[provider];
      const response_ = await wallet_function(secretKey, apiKey);
      if (response_.status == 401) {
        res.send(response_);
      } else {
        res.send({ status: 200, msg: 'verified key' });
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = WalletController;
