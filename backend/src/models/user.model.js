const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  description: { type: String },
  uniqueId: { type: String, unique: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
}, {
  collection: "clients"
});

module.exports = mongoose.model("User", userSchema);
