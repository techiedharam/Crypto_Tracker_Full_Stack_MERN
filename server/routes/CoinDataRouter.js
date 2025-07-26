const { getCurrentCoinData, storeCoinHistoryData } = require('../controllers/CoinDataController');
const ensureAuthenticated = require('../middleware/Auth');
const router = require('express').Router();

// Route to get current coin data
router.get('/current', ensureAuthenticated, getCurrentCoinData);

// Route to store coin history data
router.post('/history', ensureAuthenticated, storeCoinHistoryData);


module.exports = router;