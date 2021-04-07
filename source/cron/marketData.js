const { CronJob } = require('cron');
const { saveMarketData } = require('../database/operations/CoingeckoDb');

// This string indicates that "every minute".
const cronTiming = '* * * * *';

const updateDatabase = new CronJob(
    cronTiming,
    (() => saveMarketData()),
    () => console.log('Cron ticked'),
    true,
);

module.exports = {
    updateDatabase,
};
