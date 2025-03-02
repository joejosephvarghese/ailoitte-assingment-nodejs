const express = require('express');
const {categoryController} = require('../../controllers');

const router = express.Router();

const authMiddleware = require("../../middleware/authMiddleware");
const adminAuthMiddleware = require("../../middleware/adminAuthMiddleware");
router.use(authMiddleware);
router.use(adminAuthMiddleware);



/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     description: Admin can create a new product category by providing category details.
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 description: A short description of the category.
 *                 example: "Electronics and gadgets"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category created successfully."
 *                 categoryId:
 *                   type: string
 *                   example: "60c72b2f5f1b2c001f1c2e1d"
 *       400:
 *         description: Invalid input or missing fields
 *       401:
 *         description: Unauthorized - Admin authentication required
 *       500:
 *         description: Internal server error
 */
router.post('/', categoryController.createCategory);


/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     description: Fetch a list of all product categories.
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categoryId:
 *                     type: string
 *                     description: The unique identifier for the category.
 *                     example: "60c72b2f5f1b2c001f1c2e1d"
 *                   name:
 *                     type: string
 *                     description: The name of the category.
 *                     example: "Electronics"
 *                   description:
 *                     type: string
 *                     description: A description of the category.
 *                     example: "Electronics and gadgets"
 *       500:
 *         description: Internal server error
 */

router.get('/', categoryController.getAllCategory);


/**
 * @swagger
 * /category/{categoryId}:
 *   get:
 *     summary: Get a category by ID
 *     description: Fetch a product category by its unique identifier (ID).
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The unique identifier for the category.
 *         schema:
 *           type: string
 *           example: "60c72b2f5f1b2c001f1c2e1d"
 *     responses:
 *       200:
 *         description: Category details successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoryId:
 *                   type: string
 *                   description: The unique identifier for the category.
 *                   example: "60c72b2f5f1b2c001f1c2e1d"
 *                 name:
 *                   type: string
 *                   description: The name of the category.
 *                   example: "Electronics"
 *                 description:
 *                   type: string
 *                   description: A description of the category.
 *                   example: "Electronics and gadgets"
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

router.get('/:categoryId', categoryController.getByCategoryId);

/**
 * @swagger
 * /category/{categoryId}:
 *   put:
 *     summary: Update a category by ID
 *     description: Admin can update a product category by providing the category ID and the updated details.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The unique identifier for the category to be updated.
 *         schema:
 *           type: string
 *           example: "60c72b2f5f1b2c001f1c2e1d"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: "Electronics"
 *               description:
 *                 type: string
 *                 description: A short description of the category.
 *                 example: "Electronics and gadgets"
 *     responses:
 *       200:
 *         description: Category successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category updated successfully."
 *                 categoryId:
 *                   type: string
 *                   example: "60c72b2f5f1b2c001f1c2e1d"
 *       400:
 *         description: Invalid input or missing fields
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

router.put('/:categoryId', categoryController.updateCategory);


/**
 * @swagger
 * /category/{categoryId}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Admin can delete a product category by providing the category ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The unique identifier for the category to be deleted.
 *         schema:
 *           type: string
 *           example: "60c72b2f5f1b2c001f1c2e1d"
 *     responses:
 *       200:
 *         description: Category successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully."
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:categoryId', categoryController.deleteCategory);



module.exports = router;