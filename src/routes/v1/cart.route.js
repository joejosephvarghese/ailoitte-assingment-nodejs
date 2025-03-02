const express = require("express");
const { cartController } = require("../../controllers");

const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.post('/',cartController.addToCart);

router.get('/',cartController.getUserCart);

router.delete('/',cartController.removeFromCart);

router.delete('/clear',cartController.clearUserCart);



module.exports = router;