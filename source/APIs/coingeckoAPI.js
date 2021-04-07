/* eslint-disable no-restricted-syntax */
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
        try {
            const coinList = await CoingeckoAPI.fetchCoinList();
            response.send({
                data: coinList,
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
            const coinList = await this.fetchCoinList();

            const concattedCoinNames = coinList.map((coin) => coin.symbol).join();
            const requestParams = this.getParams(concattedCoinNames);

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
     * @function fetchCoinList Fetchs data from Coingecko API's.
     * @returns {object} Data that contains COINGECKO supported coin list.
     */
    static async fetchCoinList() {
        const url = baseUrls.COINGECKO + coingeckoEndpoints.COINS_LIST;
        try {
            const apiResponse = await axios.get(url);
            return apiResponse.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * @param {string} currency Currency for convert prices. Default is USD.
     * @param {number} capacity Number of results per page. Max: 250, min: 1. Default is 250.
     * @returns {object} Object that contains function params.
     */
    static getParams(coinNames, currency, capacity) {
        return {
            vs_currency: currency || 'usd',
            per_page: capacity || 250,
            ids: coinNames,
        };
    }
}

module.exports = CoingeckoAPI;
