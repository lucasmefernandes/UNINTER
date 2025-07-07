
const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  institutionId: String,
  quantity: Number,
  receiptId: { type: mongoose.Schema.Types.ObjectId, ref: "Receipt" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sale", SaleSchema);
