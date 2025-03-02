const express = require("express");
const router = express.Router();
const { orderController } = require("../../controllers");
const authMiddleware = require("../../middleware/authMiddleware");
router.use(authMiddleware);

//For User

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Place a new order
 *     description: This endpoint allows the user to place an order by providing cart IDs and payment gateway.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cartIds
 *               - gateway
 *             properties:
 *               cartIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The list of cart IDs to be included in the order.
 *               gateway:
 *                 type: string
 *                 description: The payment gateway to process the payment (e.g., PayPal, Stripe).
 *                 example: "cash_on_delivery"
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order placed successfully"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     totalAmount:
 *                       type: number
 *       400:
 *         description: Missing required parameters or invalid data
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Cart items not found
 *       500:
 *         description: Internal server error
 */

router.post("/", orderController.placeOrder);

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 *
 * /order:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     description: This endpoint retrieves all orders placed by the authenticated user.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders retrieved successfully"
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orderId:
 *                         type: string
 *                         description: The ID of the order
 *                         example: "12345abcde"
 *                       status:
 *                         type: string
 *                         description: The status of the order
 *                         example: "completed"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the order was created
 *                         example: "2025-03-03T10:30:00Z"
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: No orders found for this user
 *       500:
 *         description: Internal server error
 */

router.get("/", orderController.getAllUserOrders);

//For Admin

module.exports = router;
