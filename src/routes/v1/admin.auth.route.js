const express = require("express");
const { authController } = require("../../controllers");

const router = express.Router();
/**
 * @swagger

 * /admin/register:
 *   post:
 *     summary: Register a new admin user
 *     description: This endpoint registers a new admin user in the system.
 *     tags: [ Admin Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new admin.
 *                 example: "adminUser123"
 *               email:
 *                 type: string
 *                 description: The email of the new admin.
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the new admin.
 *                 example: "StrongPassword123"
 *               name:
 *                 type: string
 *                 description: Name of the Admin".
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin user registered successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: "adminUser123"
 *                     email:
 *                       type: string
 *                       example: "admin@example.com"
 *                     role:
 *                       type: string
 *                       example: "admin"
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Internal server error
 */

router.post("/register", authController.adminSignUp);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     description: This endpoint allows an admin to log in to the system by providing credentials.
 *     tags: [Admin Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the admin.
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 description: The password of the admin.
 *                 example: "StrongPassword123"
 *     responses:
 *       200:
 *         description: Successful login and authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin logged in successfully"
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid email or password
 *       401:
 *         description: Unauthorized access due to missing or incorrect credentials
 *       500:
 *         description: Internal server error
 */

router.post("/login", authController.adminLogin);

module.exports = router;
