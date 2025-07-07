const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/create-checkout-session', paymentController.createCheckoutSession);
router.post('/confirm', paymentController.confirmPayment);
router.get('/sales/my', verifyToken, paymentController.getMySales);

module.exports = router;
