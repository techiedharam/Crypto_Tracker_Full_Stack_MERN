const CurrentDataModel = require('../models/CurrentData');
const HistoryModel = require('../models/HistoryData');
const axios = require('axios');

const getCurrentCoinData = async (req, res) => {
  try {
    // Fetch data from CoinGecko API
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
    );
    // Transform the API data to match our schema
    const coinData = response.data.map(coin => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      marketCap: coin.market_cap,
      priceChangePercentage: coin.price_change_percentage_24h,
      lastUpdated: new Date(coin.last_updated)
    }));

    // Update the current data in database (optional - store latest data)
    for (const coin of coinData) {
      await CurrentDataModel.findOneAndUpdate(
        { coinId: coin.coinId },
        coin,
        { upsert: true, new: true }
      );
    }

    // Return the fresh data to frontend
    res.json({
      success: true,
      data: coinData,
      message: 'Cryptocurrency data fetched successfully'
    });

  } catch (error) {
    console.error('Error fetching current coin data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cryptocurrency data',
      message: error.message
    });
  }
};

// POST /api/history - Store a snapshot of current prices in the database
const storeCoinHistoryData = async (req, res) => {
  try {
    // Fetch fresh data from CoinGecko API
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
    );

    // Transform the API data for history storage
    const historyData = response.data.map(coin => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      marketCap: coin.market_cap,
      priceChangePercentage: coin.price_change_percentage_24h,
      timestamp: new Date()
    }));

    // Store historical snapshot in database
    const savedHistory = await HistoryModel.insertMany(historyData);

    res.json({
      success: true,
      data: savedHistory,
      message: `Historical snapshot stored successfully for ${historyData.length} cryptocurrencies`
    });

  } catch (error) {
    console.error('Error storing historical data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to store historical data',
      message: error.message
    });
  }
};

// GET /api/history/:coinId - Return historical price data for the specified coin
const getCoinHistory = async (req, res) => {
  try {
    const { coinId } = req.params;
    const { limit = 24, days = 7 } = req.query; // Default to last 24 records or 7 days

    // Find historical data for the specific coin
    const historicalData = await HistoryModel
      .find({ coinId })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    if (historicalData.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No historical data found for coin: ${coinId}`
      });
    }

    // Format data for charts (optional processing)
    const chartData = historicalData.map(record => ({
      timestamp: record.timestamp,
      price: record.price,
      marketCap: record.marketCap,
      priceChange: record.priceChangePercentage
    }));

    res.json({
      success: true,
      coinId: coinId,
      totalRecords: historicalData.length,
      data: historicalData,
      chartData: chartData,
      message: `Historical data for ${coinId} retrieved successfully`
    });

  } catch (error) {
    console.error('Error fetching coin history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch historical data',
      message: error.message
    });
  }
};

module.exports = { getCurrentCoinData, storeCoinHistoryData, getCoinHistory };
