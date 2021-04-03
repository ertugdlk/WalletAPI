const axios = require('axios');
const {
    baseUrls, 
    coingeckoEndpoints
} = require('./variables/urls');

const {
    EXTERNAL_REQUEST_FAIL
} = require('../variables/errors');


class CoingeckoAPI {

    /**
     * @function
     * @returns {response} Returns the list of available coins in the coingecko with
     * their id's.
     */
    getCoinList = async (request, response) => {
        const url = baseUrls.COINGECKO + coingeckoEndpoints.COINS_LIST;

        try {
            const apiResponse = await axios.get(url);  
            response.send({
                data: apiResponse.data,
                status: 200
            });
        } catch (error) {
            response.send({
                msg: error.message || EXTERNAL_REQUEST_FAIL,
                status: error.status || 400
            });
        }
    }

    /**
     * @function
     * @returns {response} Returns the coin market which includes coin prices.
     */
    getCoinMarket = async (request, response) => {
        const url = baseUrls.COINGECKO + coingeckoEndpoints.COIN_MARKETS;

        try {
            const requestParams = this.getParams();
            const apiResponse = await axios.get(
                url,
                {params: requestParams}
            );
            response.send({
                data: apiResponse.data,
                status: 200
            });
        } catch (error) {
            response.send({
                msg: error.message || EXTERNAL_REQUEST_FAIL,
                status: error.status || 400
            });
        }
    }

    /**
     * 
     * @param {string} currency Currency for convert prices. Default is USD. 
     * @returns {object} Object that contains function params.
     */
    getParams = (currency) => {
        return {
            'vs_currency': currency || 'usd'
        };
    }
}

module.exports = new CoingeckoAPI();