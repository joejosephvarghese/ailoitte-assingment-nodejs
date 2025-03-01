const express = require("express");
const { productController } = require("../../controllers");
const multer = require("multer");
const router = express.Router();
const upload = multer();

router.post( "/", upload.fields([{ name: "file" }]), productController.createProduct);

router.get("/", productController.getAllProducts);
module.exports = router;
