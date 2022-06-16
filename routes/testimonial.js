const router = require('express').Router()
const { createTestimonialSchema, updateTestimonialSchema } = require('../schemas/testimonial')
const { validateSchema } = require('../middlewares/validateErrors')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const {
  list, post, destroy, update,
} = require('../controllers/testimonial')
const { uploadImage } = require('../middlewares/uploadImage')

router.get('/', auth, list)

// Define testimonial schemas
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       in: header
 *       name: Authorization
 *   schemas:
 *     Testimonial:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           format: string
 *           example: "John Doe"
 *         image:
 *          type: string
 *          format: string
 *          example: "https://example.com/image.png"
 *         content:
 *           type: string
 *           format: string
 *           example: "This is a testimonial"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2020-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2020-01-01T00:00:00.000Z"
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           example: null
 */

// Define testimonial tags
/**
 * @swagger
 * tags:
 *   name: Testimonials
 *   description: The testimonials API
 */

// Document routes
/**
 * @swagger
 * /testimonials:
 *   post:
 *     summary: Create a new testimonial
 *     tags: [Testimonials]
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *           image:
 *            type: string
 *            format: binary
 *            required: true
 *           name:
 *            type: string
 *            required: true
 *           content:
 *            type: string
 *            required: true
 *     security:
 *      - bearerAuth: {}
 *     responses:
 *       201:
 *         description: Testimonial created successfully
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
 *                   $ref: '#/components/schemas/Testimonial'
 *       400:
 *        description: Bad request
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                type: integer
 *                description: The error code
 *               status:
 *                   type: boolean
 *                   description: The status of the response
 *               message:
 *                   type: string
 *                   description: The message of the response
 *             example:
 *              code: 400
 *              status: false
 *              message: "Testimonial not created"
 *       500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                type: integer
 *                description: The error code
 *               status:
 *                   type: boolean
 *                   description: The status of the response
 *               message:
 *                   type: string
 *                   description: The message of the response
 *             example:
 *              code: 500
 *              status: false
 *              message: "Internal server error"
 */
router.post('/', auth, isAdmin, uploadImage('image'), validateSchema(createTestimonialSchema), post)

/**
 * @swagger
 * /testimonials/{id}:
 *   put:
 *     summary: Update a testimonial
 *     tags: [Testimonials]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The testimonial id
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *         schema:
 *          type: object
 *          properties:
 *           image:
 *            type: string
 *            format: binary
 *            required: true
 *           name:
 *            type: string
 *            required: true
 *           content:
 *            type: string
 *            required: true
 *     security:
 *      - bearerAuth: {}
 *     responses:
 *       200:
 *         description: Testimonial updated successfully
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
 *                   $ref: '#/components/schemas/Testimonial'
 *       500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                type: integer
 *                description: The error code
 *               status:
 *                   type: boolean
 *                   description: The status of the response
 *               message:
 *                   type: string
 *                   description: The message of the response
 *             example:
 *              code: 500
 *              status: false
 *              message: "Internal server error"
 *       404:
 *        description: Testimonial not found
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                type: integer
 *                description: The error code
 *               status:
 *                   type: boolean
 *                   description: The status of the response
 *               message:
 *                   type: string
 *                   description: The message of the response
 *             example:
 *              code: 404
 *              status: false
 *              message: "Testimonial with id 1 not found"
 */
router.put(
  '/:id',
  auth,
  isAdmin,
  uploadImage('image'),
  validateSchema(updateTestimonialSchema),
  update,
)

/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     summary: Delete a testimonial
 *     tags: [Testimonials]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The testimonial id
 *     security:
 *      - bearerAuth: {}
 *     responses:
 *      200:
 *        description: Testimonial deleted successfully
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                example:
 *                   code: 200
 *                   status: true
 *                   message: "Testimonial deleted successfully"
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                type: integer
 *                description: The error code
 *               status:
 *                   type: boolean
 *                   description: The status of the response
 *               message:
 *                   type: string
 *                   description: The message of the response
 *             example:
 *              code: 500
 *              status: false
 *              message: "Internal server error"
 */
router.delete('/:id', auth, isAdmin, destroy)

module.exports = router
