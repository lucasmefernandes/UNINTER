const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth.middleware");
const productController = require("../controllers/product.controller");

router.post("/add", verifyToken, productController.addProduct);
router.get("/products/:institutionId", productController.getProductsByInstitution);
router.get('/product/my', verifyToken, productController.getMyProducts);

module.exports = router;
