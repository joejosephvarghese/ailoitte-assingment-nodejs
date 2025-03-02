const express = require("express");
const { productController } = require("../../controllers");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const authMiddleware = require("../../middleware/authMiddleware");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");
router.use(authMiddleware);

router.post(
  "/",
  upload.fields([{ name: "file" }]),
  adminAuthMiddleware,
  productController.createProduct
);

router.put(
  "/:productId",
  upload.fields([{ name: "file" }]),
  adminAuthMiddleware,
  productController.updateProduct
);

router.get(
  "/:productId",
  adminAuthMiddleware,
  productController.getProductById
);
router.delete(
  "/:productId",
  adminAuthMiddleware,
  productController.deleteProduct
);
router.get("/", productController.getAllProducts);
module.exports = router;
