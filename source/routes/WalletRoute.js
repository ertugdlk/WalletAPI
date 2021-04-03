const router = require('express').Router();
const walletController = require('../controllers/WalletController');

router.post('/', walletController.getWallet);
router.post('/control', walletController.controlKeys);

module.exports = router;
