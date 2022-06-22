const router = require('express').Router()
const { userRegisterSchema, userLoginSchema } = require('../schemas/user')
const { validateSchema } = require('../middlewares/validateErrors')
const { post, login, userDataByToken } = require('../controllers/user')
const { auth } = require('../middlewares/auth')

// Define Auth schemas
/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *    in: header
 *    name: Authorization
 *    description: Bearer token
 *    required: true
 */

// Define testimonial tags
/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth routes
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *   tags:
 *   - Auth
 *   summary: Register a new user
 *   description: Register a new user
 *   requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          firstName:
 *           type: string
 *           required: true
 *          lastName:
 *           type: string
 *           required: true
 *          email:
 *           type: string
 *           required: true
 *           format: email
 *          password:
 *           type: string
 *           required: true
 *           format: password
 *   responses:
 *     '200':
 *      description: User created
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          status:
 *           type: boolean
 *          message:
 *           type: string
 *          body:
 *           type: object
 *           properties:
 *            userToken:
 *             type: string
 *         example:
 *          status: true
 *          message: User created
 *          body:
 *           userToker: 123123131223123123
 */
router.post('/register', validateSchema(userRegisterSchema), post)

// login user
/**
 * @swagger
 * /auth/login:
 *  post:
 *   tags:
 *   - Auth
 *   summary: Login a user
 *   description: Login a user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       required:
 *        - email
 *        - password
 *       properties:
 *        email:
 *         type: string
 *         format: email
 *        password:
 *         type: string
 *         format: password
 *   responses:
 *    '200':
 *     description: User logged in
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          status:
 *           type: boolean
 *          message:
 *           type: string
 *          body:
 *           type: object
 *           properties:
 *            user:
 *             type: object
 *             properties:
 *              id:
 *               type: string
 *              firstName:
 *               type: string
 *              lastName:
 *               type: string
 *              email:
 *               type: string
 *              password:
 *               type: string
 *              createdAt:
 *               type: string
 *              updatedAt:
 *               type: string
 *            token:
 *             type: string
 *             format: jwt
 *        example:
 *         status: true,
 *         message: User logged in,
 *         body:
 *          user:
 *           id: 1
 *           firstName: John
 *           lastName: Doe
 *           email: example@asd.com
 *           password: password
 *           createdAt: '2020-01-01T00:00:00.000Z'
 *           updatedAt: '2020-01-01T00:00:00.000Z'
 *          token: 123123123123123123s
 */
router.post('/login', validateSchema(userLoginSchema), login)

// authenticated user data
/**
 * @swagger
 * /auth/me:
 *  get:
 *   tags:
 *   - Auth
 *   summary: Get authenticated user data
 *   description: Get authenticated user data
 *   security:
 *    - bearerAuth: {}
 *   responses:
 *    '200':
 *     description: User data
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         status:
 *          type: boolean
 *         message:
 *          type: string
 *         body:
 *          type: object
 *          properties:
 *           user:
 *            type: object
 *            properties:
 *             id:
 *              type: string
 *             firstName:
 *              type: string
 *             lastName:
 *              type: string
 *             email:
 *              type: string
 *             createdAt:
 *              type: string
 *             updatedAt:
 *              type: string
 */
router.get('/me', auth, userDataByToken)

module.exports = router
