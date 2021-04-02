const CoingeckoAPI = require('../APIs/coingeckoAPI');
const router = require("express").Router();

router.get('/coingecko/coinlist', CoingeckoAPI.getCoinList);
router.get('/coingecko/coinmarket', CoingeckoAPI.getCoinMarket);

module.exports = router;
