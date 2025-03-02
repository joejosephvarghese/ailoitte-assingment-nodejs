const express = require("express");
const { productController } = require("../../controllers");
const multer = require("multer");
const router = express.Router();
const upload = multer();

router.post( "/", upload.fields([{ name: "file" }]), productController.createProduct);

router.put( "/:productId", upload.fields([{ name: "file" }]), productController.updateProduct);

router.get( "/:productId",productController.getProductById);
router.get("/", productController.getAllProducts);
module.exports = router;
