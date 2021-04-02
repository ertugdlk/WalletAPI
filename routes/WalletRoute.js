const wallet_controller = require("../controllers/WalletController");
const router = require("express").Router();

router.post("/", wallet_controller.getWallet);
router.post("/control", wallet_controller.controlKeys);


module.exports = router;
