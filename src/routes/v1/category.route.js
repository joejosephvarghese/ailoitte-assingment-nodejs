const express = require('express');
const {categoryController} = require('../../controllers');

const router = express.Router();

router.post('/', categoryController.createCategory);

router.get('/', categoryController.getAllCategory);


router.get('/:categoryId', categoryController.getByCategoryId);

router.put('/:categoryId', categoryController.updateCategory);



module.exports = router;