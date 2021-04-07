const { mongoClient } = require('../config');
const coingeckoApi = require('../../APIs/coingeckoAPI');

async function saveMarketData() {
    const database = mongoClient.db('test');
    const oldData = database.collection('coingeckoMarket');

    try {
        const newData = await coingeckoApi.fetchCoinMarket();
        newData.forEach((coin) => {
            console.log(coin);
            oldData.findOneAndUpdate({ id: coin.id }, { $set: coin }, { upsert: true });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    saveMarketData,
};
