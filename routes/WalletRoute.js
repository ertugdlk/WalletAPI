const wallet_controller = require("../controllers/WalletController")
const router = require("express").Router()

router.post("/", wallet_controller.getWallet)

module.exports = router
