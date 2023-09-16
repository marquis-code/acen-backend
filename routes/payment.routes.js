const express = require('express');
const { checkUser } = require("../middleware/auth.middleware");
const { startPayment, createPayment, getPayment } = require('../controllers/payment.controller');

const router = express.Router()

router.post('/', startPayment );
router.get('/createPayment', createPayment);
router.get('/paymentDetails', getPayment);

module.exports = router;