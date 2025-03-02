const express = require('express');
const {categoryController} = require('../../controllers');

const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");
router.use(authMiddleware);
router.use(adminAuthMiddleware);

router.post('/', categoryController.createCategory);

router.get('/', categoryController.getAllCategory);


router.get('/:categoryId', categoryController.getByCategoryId);

router.put('/:categoryId', categoryController.updateCategory);

router.delete('/:categoryId', categoryController.deleteCategory);



module.exports = router;