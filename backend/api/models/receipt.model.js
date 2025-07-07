const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  institutionId: { type: String, required: true },
  institutionName: { type: String },
  products: [
    {
      id: String,
      name: String,
      price: Number,
      imageUrl: String,
      unit: Number,
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Receipt", ReceiptSchema);
