//Base URL' for Restfull HTTP requests
const BaseUrls =  {
    BINANCE: 'https://api3.binance.com/api/v3/' ,
    FTX: 'https://ftx.com/api/',
    BITMAX: 'https://bitmax.io/',
    COINGECKO: 'https://api.coingecko.com/api/v3/',
}

const BitmaxEndpoints = {
    PUBLIC_ASSETS: 'assets',
    //https://bitmax-exchange.github.io/bitmax-pro-api/#list-all-assets
    PUBLIC_TRADE_LIST: 'products',
    //https://bitmax-exchange.github.io/bitmax-pro-api/#list-all-products
    PUBLIC_STATS: 'ticker',
    //https://bitmax-exchange.github.io/bitmax-pro-api/#ticker,

    ACCOUNT_INFO: 'info',
    //https://bitmax-exchange.github.io/bitmax-pro-api/#account-info
    WALLET: 'cash/balance',
    //https://bitmax-exchange.github.io/bitmax-pro-api/#balance
}

const CoingeckoEndpoints = {
    COINS_LIST: 'coins/list',
    COIN_MARKETS: 'coins/markets'
}

module.exports = {
    baseUrls: BaseUrls,
    bitmaxEndpoints: BitmaxEndpoints,
    coingeckoEndpoints: CoingeckoEndpoints
}
