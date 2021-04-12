const _ = require('lodash');

const { mongoClient } = require('../config');
const coingeckoApi = require('../../APIs/coingeckoAPI');

async function saveMarketData() {
    console.log('Starting to fetch market data from Coingecko API');

    const database = mongoClient.db('test');
    const oldData = database.collection('coingeckoMarket');

    try {
        console.log(`Start: ${new Date()}`);

        const newData = await coingeckoApi.fetchCoinMarket();
        const flattenData = _.flatten(newData);

        for (const coin of flattenData) {
            oldData.findOneAndUpdate(
                { id: coin.id },
                { $set: coin },
                { upsert: true },
            );
        }

        console.log(`End: ${new Date()}`);
        console.log(`Length of Coingecko API response: ${flattenData.length}`);
        console.log('MongoDB updated by Coingecko.');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    saveMarketData,
};
