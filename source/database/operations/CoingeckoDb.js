const _ = require('lodash');

const { mongoClient } = require('../config');
const coingeckoApi = require('../../APIs/coingeckoAPI');

async function saveMarketData() {
    const database = mongoClient.db('test');
    const oldData = database.collection('coingeckoMarket');

    try {
        const newData = await coingeckoApi.fetchCoinMarket();
        const flattenData = _.flatten(newData);

        flattenData.forEach((coin, index) => {
            console.log(index);
            oldData.findOneAndUpdate(
                { id: coin.id },
                { $set: coin },
                { upsert: true },
            );
        });

        console.log(`Length of Coingecko API response: ${flattenData.length}`);
        console.log('MongoDB updated by Coingecko.');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    saveMarketData,
};
