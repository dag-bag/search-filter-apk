const mongoose = require("mongoose");
const { Schema } = mongoose;
const tradingSchema = new Schema({
  e: {
    type: String,
    required: true,
  },
  s: {
    type: String,
    required: true,
  },
  c: {
    type: String,
    required: true,
  },
});
mongoose.models = {};
module.exports = mongoose.model("Trading", tradingSchema);
