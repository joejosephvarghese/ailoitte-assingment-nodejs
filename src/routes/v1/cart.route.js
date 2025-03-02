const express = require("express");
const { cartController } = require("../../controllers");

const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.post('/',cartController.addToCart);
module.exports = router;