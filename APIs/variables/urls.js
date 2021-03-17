//Base URL' for Restfull HTTP requests
const BaseUrls =  {
    BINANCE: 'https://api3.binance.com/api/v3/' ,
    FTX: 'https://ftx.com/api/',
    BITMAX: 'https://bitmax.io/'
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

module.exports = {
    baseUrls: BaseUrls,
    bitmaxEndpoints: BitmaxEndpoints
}
