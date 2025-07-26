const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrentDataSchema = new Schema({
  coinId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  currentPrice: {
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

const CurrentDataModel = mongoose.model('CurrentData', CurrentDataSchema);
module.exports = CurrentDataModel;
