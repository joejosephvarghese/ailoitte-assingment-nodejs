const express = require('express');
const {authController} = require('../../controllers');

const router = express.Router();

router.post('/register', authController.adminSignUp);
router.post('/login', authController.adminLogin);

module.exports = router;