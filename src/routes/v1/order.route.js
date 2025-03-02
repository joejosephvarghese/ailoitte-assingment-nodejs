
const express = require('express');
const router = express.Router();
const {orderController}=require('../../controllers')
const authMiddleware = require('../../middleware/authMiddleware');
router.use(authMiddleware);


//For User
router.post('/', orderController.placeOrder);

router.get('/', orderController.getAllUserOrders);




//For Admin








module.exports = router;