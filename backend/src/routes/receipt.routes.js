const express = require("express");
const router = express.Router();
const receiptController = require("../controllers/receipt.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/create", verifyToken, receiptController.createReceipt);

module.exports = router;
