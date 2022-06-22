const express = require('express')

const router = new express.Router()

const { validateSchema } = require('../middlewares/validateErrors')
const { newSchema, updateNewSchema } = require('../schemas/new')
const {
  post, listNew, update, destroy, list,
} = require('../controllers/news')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { listNewsComments } = require('../controllers/comments')
const { uploadImage } = require('../middlewares/uploadImage')

// Define news schemas
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
 *     News:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           format: string
 *           required: true
 *         content:
 *          type: string
 *          format: string
 *          required: true
 *         image:
 *           type: string
 *           format: string
 *           required: true
 *         type:
 *           type: string
 *           format: string
 *           required: true
 *         categoryId:
 *           type: integer
 *           format: integer
 *           required: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           type: string
 *           format: date-time
 */

// Define news tags
/**
 * @swagger
 * tags:
 *   name: News
 *   description: The news API
 */

// list all News
/**
 * @swagger
 * /news:
 *   get:
 *     tags: [News]
 *     summary: Get a listing of the News.
 *     description: Get all news
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
 *                     content:
 *                       type: string
 *                       format: string
 *                     image:
 *                       type: file
 *                       format: binary
 *                     type:
 *                       type: string
 *                       format: string
 *                     categoryId:
 *                       type: integer
 *                       format: integer
 */
router.get('/', list)
// list category by id
/**
 * @swagger
 * /news/{id}:
 *   get:
 *     tags: [News]
 *     summary: Display the specified News
 *     description: Get a specific news
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The news id number
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
 *                   $ref: '#/components/schemas/News'
 */
router.get('/:id', listNew)
/**
 * @swagger
 * /news:
 *   post:
 *     tags: [News]
 *     summary: Create news
 *     description: Create news
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
 *           content:
 *            type: string
 *            required: true
 *           image:
 *            type: file
 *            format: binary
 *            required: true
 *           type:
 *            type: string
 *            required: true
 *           categoryId:
 *            type: integer
 *            required: true
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
 *                   $ref: '#/components/schemas/News'
 */
router.post('/', auth, isAdmin, uploadImage('image'), validateSchema(newSchema), post)
/**
 * @swagger
 * /news/{id}:
 *   put:
 *     tags: [News]
 *     summary: Update news
 *     description: Update news
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
 *           content:
 *            type: string
 *            required: false
 *           image:
 *            type: file
 *            format: binary
 *            required: false
 *           type:
 *            type: string
 *            required: false
 *           categoryId:
 *            type: integer
 *            required: false
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The news id number
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
 *                   $ref: '#/components/schemas/News'
 */
router.put('/:id', auth, isAdmin, uploadImage('image'), validateSchema(updateNewSchema), update)
/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     tags: [News]
 *     summary: Remove the specified News
 *     description: Destroy a specific News
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The news id number
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
 */
router.delete('/:id', auth, isAdmin, destroy)
// get news comments
/**
 * @swagger
 * /news/{id}/comments:
 *   get:
 *     tags: [News]
 *     summary: show the specific comments
 *     description: Get a specific comments
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The comments id number
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
 *                   type: object
 *                   properties:
 *                     comments:
 *                       type: string
 *                       format: string
 */
router.get('/:id/comments', auth, listNewsComments)

module.exports = router
