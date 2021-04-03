const axios = require('axios');
const {
    baseUrls,
    coingeckoEndpoints,
} = require('./variables/urls');

const {
    EXTERNAL_REQUEST_FAIL,
} = require('../variables/responses');

class CoingeckoAPI {
    /**
     * @function
     * @returns {response} Returns the list of available coins in the coingecko with
     * their id's.
     */
    static async getCoinList(request, response) {
        const url = baseUrls.COINGECKO + coingeckoEndpoints.COINS_LIST;

        try {
            const apiResponse = await axios.get(url);
            response.send({
                data: apiResponse.data,
                status: 200,
            });
        } catch (error) {
            response.send({
                msg: error.message || EXTERNAL_REQUEST_FAIL,
                status: error.status || 400,
            });
        }
    }

    /**
     * @function getCoinMarket Endpoint function.
     * @returns {response} Returns the coin market which includes coin prices.
     */
    static async getCoinMarket(request, response) {
        try {
            const marketData = await CoingeckoAPI.fetchCoinMarket();
            response.send({
                data: marketData,
                status: 200,
            });
        } catch (error) {
            response.send({
                msg: error.message || EXTERNAL_REQUEST_FAIL,
                status: error.status || 400,
            });
        }
    }

    /**
     * @function fetchCoinMarket Fetchs data from Coingecko API's.
     * @returns {object} Data that contains COINGECKO market data.
     */
    static async fetchCoinMarket() {
        const url = baseUrls.COINGECKO + coingeckoEndpoints.COIN_MARKETS;

        try {
            const requestParams = this.getParams();
            const apiResponse = await axios.get(
                url,
                { params: requestParams },
            );

            return apiResponse.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * @param {string} currency Currency for convert prices. Default is USD.
     * @returns {object} Object that contains function params.
     */
    static getParams(currency) {
        return {
            vs_currency: currency || 'usd',
        };
    }
}

module.exports = CoingeckoAPI;
