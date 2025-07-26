const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoryDataSchema = new Schema({
  coinId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  priceChangePercentage: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for efficient queries by coinId and timestamp
// HistorySchema.index({ coinId: 1, timestamp: -1 });

const HistoryDataModel = mongoose.model('HistoryData', HistoryDataSchema);
module.exports = HistoryDataModel;