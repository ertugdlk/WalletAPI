const router = require('express').Router();
const CoingeckoAPI = require('../APIs/coingeckoAPI');

router.get('/coingecko/coinlist', CoingeckoAPI.getCoinList);
router.get('/coingecko/coinmarket', CoingeckoAPI.getCoinMarket);

module.exports = router;
