const axios = require('axios');
const cryptoLib= require('crypto');

//Variables
const {baseUrls, bitmaxEndpoints} = require('./variables/urls');


//@class
//@classdesc Class that includes Bitmax.com integration functions
class BitmaxApi {

    /*
    * Returns wallet belongs to the secretKey and apiKey
    * @param {string} secretKey User provided secretKey
    * @param {string} apiKey User provided apiKey
    */
    getWallet = async (secretKey, apiKey) => {

        const requestHeader = this.getRequestHeader(
            bitmaxEndpoints.ACCOUNT_INFO,
            secretKey,
            apiKey
        );

        try {
            const response = await axios.get(
                baseUrls.BITMAX + bitmaxEndpoints.ACCOUNT_INFO,
                {headers: requestHeader}
            );

            console.log('Response data: ' + JSON.stringify(response.data));
        } catch(error) {
            console.log(error.data)
        }
    }

    /*
    * Returns the header for private data fetching using axios.
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
            .digest("hex")

        return {
            "x-auth-key": apiKey,
            "x-auth-timestamp": timestamp,
            "x-auth-signature": signature
        }
    }
}

module.exports = new BitmaxApi();
