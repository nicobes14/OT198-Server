const router = require('express').Router()
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const categorySchema = require('../schemas/category')
const { validateSchema } = require('../middlewares/validateErrors')

const {
  list, listCategory, update, post, destroy,
} = require('../controllers/categories')

/**
 * @swagger
 * tags:
 *   name: Categories
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       in: header
 *       name: Authorization
 *   schemas:
 *    Category:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         format: integer
 *       name:
 *         type: string
 *         format: string
 *         required: true
 *       description:
 *         type: string
 *         format: string
 *       image:
 *         type: string
 *         format: string
 *       createdAt:
 *         type: string
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         format: date-time
 *       deletedAt:
 *         type: string
 *         format: date-time
 *
 */

// list category by id
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Display the specified Category
 *     description: Get a specific category
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The category id number
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   format: boolean
 *                 message:
 *                   type: string
 *                   format: string
 *                 body:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Error response - Category with the specific id not found.
 *       500:
 *         description: Error response - Internal server error.
 *
 */
router.get('/:id', listCategory)

// list all categories
/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get a listing of the Categories.
 *     description: Get all categories
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   format: boolean
 *                 message:
 *                   type: string
 *                   format: string
 *                 body:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       format: string
 *       500:
 *         description: Internal server error.
 */
router.get('/', list)

// create a new category
/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: Create a new Category in storage
 *     description: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *           name:
 *            type: string
 *            required: true
 *           description:
 *            type: string
 *            required: false
 *           image:
 *            type: file
 *            format: binary
 *            required: false
 *     security:
 *      - bearerAuth: {}
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   format: boolean
 *                 message:
 *                   type: string
 *                   format: string
 *                 body:
 *                   $ref: '#/components/schemas/Category'
 *       500:
 *         description: Error response - Internal server error.
 */
router.post('/', auth, isAdmin, validateSchema(categorySchema), post)

// delete category
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Remove the specified Category in storage
 *     description: Destroy a specific category
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The category id number
 *     security:
 *      - bearerAuth: {}
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   format: boolean
 *                 message:
 *                   type: string
 *                   format: string
 *       404:
 *         description: Error response - Category with the specific id not found.
 *       500:
 *         description: Error response - Internal server error.
 *
 */
router.delete('/:id', auth, isAdmin, destroy)

// edit category
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Update the specified Category in storage
 *     description: Update a specific category
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *           name:
 *            type: string
 *            required: true
 *           description:
 *            type: string
 *            required: false
 *           image:
 *            type: file
 *            format: binary
 *            required: false
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The category id number
 *     security:
 *      - bearerAuth: {}
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   format: boolean
 *                 message:
 *                   type: string
 *                   format: string
 *                 body:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Error response - Category with the specific id not found.
 *       500:
 *         description: Error response - Internal server error.
 */
router.put('/:id', auth, isAdmin, validateSchema(categorySchema), update)

module.exports = router
