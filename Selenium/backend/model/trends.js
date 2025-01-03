const mongoose = require('mongoose');

const trendingSchema = new mongoose.Schema({
  trending1: {type: String},
  trending2: {type: String},
  trending3: {type: String},
  trending4: {type: String},
  ipAddress: {type: String},
  createdAt: {
      type: Date,
      default: Date.now()
  },
});

module.exports = mongoose.model("Trending", trendingSchema)
