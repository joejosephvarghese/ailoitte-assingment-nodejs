const express = require("express");
const { cartController } = require("../../controllers");

const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();
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
 * tags:
 *   name: Cart
 *   description: Operations related to cart
 *
 * /cart:
 *   post:
 *     summary: Add a product to the cart
 *     description: This endpoint adds a product to the user's cart.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           description: The ID of the product to be added to the cart.
 *       - name: quantity
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           description: The quantity of the product to be added.
 *     responses:
 *       200:
 *         description: Product successfully added to the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product added to cart successfully"
 *       400:
 *         description: Missing required fields or invalid data
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.post("/", cartController.addToCart);

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
 *   name: Cart
 *   description: Operations related to cart
 *
 * /cart:
 *   get:
 *     summary: Get the user's cart
 *     description: This endpoint fetches the cart details for the authenticated user.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cart details successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         description: The ID of the product in the cart.
 *                       quantity:
 *                         type: integer
 *                         description: The quantity of the product in the cart.
 *                       productName:
 *                         type: string
 *                         description: The name of the product.
 *                       price:
 *                         type: number
 *                         format: float
 *                         description: The price of the product.
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */

router.get("/", cartController.getUserCart);

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
 *   name: Cart
 *   description: Operations related to cart
 *
 * /cart:
 *   delete:
 *     summary: Remove a cart
 *     description: This endpoint removes the cart using the `cartId` query parameter.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cart to be removed.
 *     responses:
 *       200:
 *         description: Cart successfully removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart removed successfully"
 *       400:
 *         description: Missing required `cartId` or invalid data
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */

router.delete("/", cartController.removeFromCart);

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
 *   name: Cart
 *   description: Operations related to cart
 *
 * /cart/clear:
 *   delete:
 *     summary: Clear the user's cart
 *     description: This endpoint clears all items in the user's cart.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cart successfully cleared
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart cleared successfully"
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

router.delete("/clear", cartController.clearUserCart);

module.exports = router;
