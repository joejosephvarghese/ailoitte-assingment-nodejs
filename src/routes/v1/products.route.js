const express = require("express");
const { productController } = require("../../controllers");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const authMiddleware = require("../../middleware/authMiddleware");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");
router.use(authMiddleware);
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 

 * 
 * /product:
 *   post:
 *     summary: Create a new product
 *     description: This endpoint creates a new product and uploads associated images.
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - categoryId
 *               - stock
 *               - file
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product.
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *               categoryId:
 *                 type: string
 *                 description: The ID of the category the product belongs to.
 *                 example: "c129fe4a-7842-49c5-8c8d-59b9acf1ad98"
 *               stock:
 *                 type: number
 *                 description: The number of items in stock for the product.
 *               file:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: The images for the product (can upload multiple files).
 *     responses:
 *       201:
 *         description: Product successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     description:
 *                       type: string
 *                     categoryId:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     stock:
 *                       type: number
 *       400:
 *         description: Missing required parameter(s) or file
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */




router.post(
  "/",
  upload.fields([{ name: "file" }]),
  adminAuthMiddleware,
  productController.createProduct
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 

 * /product/{productId}:
 *   put:
 *     summary: Update an existing product
 *     description: This endpoint updates an existing product and optionally uploads new images.
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: string
 *           example: "60c72b2f9a8dcd1f3d6fbb4f"
 *     requestBody:
 *       required: false  # Optional fields
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product.
 *               description:
 *                 type: string
 *                 description: The description of the product.
 *               categoryId:
 *                 type: string
 *                 description: The ID of the category the product belongs to.
 *                 example: "c129fe4a-7842-49c5-8c8d-59b9acf1ad98"
 *               stock:
 *                 type: number
 *                 description: The number of items in stock for the product.
 *               file:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: New images for the product (optional).
 *     responses:
 *       200:
 *         description: Product successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     description:
 *                       type: string
 *                     categoryId:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     stock:
 *                       type: number
 *       400:
 *         description: Missing required parameter(s) or file
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */


router.put(
  "/:productId",
  upload.fields([{ name: "file" }]),
  adminAuthMiddleware,
  productController.updateProduct
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * tags:
 *   name: Products
 *   description: Operations related to products
 * 
 * /product/{productId}:
 *   get:
 *     summary: Get a product by its ID
 *     description: This endpoint retrieves the details of a product based on its ID.
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: string
 *           example: "60c72b2f9a8dcd1f3d6fbb4f"  # Example productId
 *     responses:
 *       200:
 *         description: Product successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                   format: float
 *                 description:
 *                   type: string
 *                 categoryId:
 *                   type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                 stock:
 *                   type: number
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */


router.get(
  "/:productId",
  adminAuthMiddleware,
  productController.getProductById
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * tags:
 *   name: Products
 *   description: Operations related to products
 * 
 * /product/{productId}:
 *   delete:
 *     summary: Delete a product by its ID
 *     description: This endpoint deletes a product based on its ID.
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: The ID of the product to delete.
 *         schema:
 *           type: string
 *           example: "60c72b2f9a8dcd1f3d6fbb4f"  # Example productId
 *     responses:
 *       200:
 *         description: Product successfully deleted
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.delete(
  "/:productId",
  adminAuthMiddleware,
  productController.deleteProduct
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * tags:
 *   name: Products
 *   description: Operations related to products
 * 
 * /product:
 *   get:
 *     summary: Get a list of all products
 *     description: This endpoint retrieves a list of all products with their details.
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination (optional)
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of products per page for pagination (optional)
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: float
 *                       description:
 *                         type: string
 *                       categoryId:
 *                         type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       stock:
 *                         type: number
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

router.get("/", productController.getAllProducts);
module.exports = router;
