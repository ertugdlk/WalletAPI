const axios = require('axios');
const cryptoLib= require('crypto');

//Variables
const {baseUrls, bitmaxEndpoints} = require('./variables/urls');


/**
* @class
* @classdesc Class that includes Bitmax.com integration functions
*/
class BitmaxApi {
    
    /**
    * Returns wallet belongs to the secretKey and apiKey
    * @param {string} secretKey User provided secretKey
    * @param {string} apiKey User provided apiKey
    * @returns {object} Object represents wallet belongs to the secretKey and apiKey
    * https://bitmax-exchange.github.io/bitmax-pro-api/#cash-account-balance
    */
    getWallet = async (secretKey, apiKey) => {
        try {
            const accountInfo = await this.getAccountInfo(
                secretKey,
                apiKey
            )

            const requestHeader = this.getRequestHeader(
                'balance',
                secretKey,
                apiKey
            )

            const response = await axios.get(
                baseUrls.BITMAX +
                    accountInfo.data.accountGroup +
                        '/api/pro/v1/' +
                            bitmaxEndpoints.WALLET,
                {headers: requestHeader}
            )

            return response.data.data;
        } catch(error) {
            return {
                msg: error.message || 'There was an error',
                status: error.status || 400
            };
        }
    };

    /**
    * Returns the account which belongs to the secretKey and apiKey.
    * This function's return statement icludes accountGroup variable that
    * used by all other private data fetching functions using for Bitmax API's.
    * @param {string} secretKey User provided secretKey
    * @param {string} apiKey User provided apiKey
    * @returns {object} Account info object.
    * https://bitmax-exchange.github.io/bitmax-pro-api/#account-info
    */
    getAccountInfo = async (secretKey, apiKey) => {
        const requestHeader = this.getRequestHeader(
            bitmaxEndpoints.ACCOUNT_INFO,
            secretKey,
            apiKey
        );

        try {
            const response = await axios.get(
                baseUrls.BITMAX + 'api/pro/v1/' + bitmaxEndpoints.ACCOUNT_INFO,
                {headers: requestHeader}
            );

            return response.data;
        } catch(error) {
            throw error;
        }
    };

    /**
    * Returns the request header for private data fetching.
    * @param {string} endpoint Endpoint for data fetch baseUrl
    * @param {string} secretKey User provided secretKey
    * @param {string} apiKey User provided apiKey
    * @returns {object} Object that represents request header
    */
    getRequestHeader = (endpoint,  secretKey, apiKey) =>  {
        const timestamp = Date.now().toString();
        const urlQuery = timestamp + endpoint;

        const signature = cryptoLib
            .createHmac("sha256", secretKey)
            .update(urlQuery)
            .digest("hex");

        return {
            "x-auth-key": apiKey,
            "x-auth-timestamp": timestamp,
            "x-auth-signature": signature
        };
    };
}

module.exports = new BitmaxApi();
