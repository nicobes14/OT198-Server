const express = require('express')

const router = new express.Router()
const {
  list, post, destroy, update,
} = require('../controllers/members')
const { memberSchema, updateMemberSchema } = require('../schemas/member')
const { validateSchema } = require('../middlewares/validateErrors')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { uploadImage } = require('../middlewares/uploadImage')

// Define members schemas
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
*     Member:
*       type: object
*       properties:
*         name:
*           type: string
*           format: string
*           example: "John Doe"
*         facebookUrl:
*          type: string
*          format: string
*          example: "https://www.facebook.com/john.doe"
*         instagramUrl:
*           type: string
*           format: string
*           example: "https://www.instagram.com/john.doe"
*         linkedinUrl:
*          type: string
*          format: string
*          example: "https://www.linkedin.com/john.doe"
*         image:
*          type: string
*          format: string
*          example: "https://www.example.com/john-doe.jpg"
*         description:
*          type: string
*          format: string
*          example: "John Doe is a web developer"
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

// Define members tags
/**
* @swagger
* tags:
*   name: Members
*   description: The members API
*/

// Document routes
/**
* @swagger
* /members:
*   post:
*     summary: Create a new member
*     description: Create a new member
*     tags: [Members]
*     parameters:
*      - in: body
*        name: body
*        required: true
*        content:
*         multipart/form-data:
*        schema:
*          type: object
*          required:
*           - name
*           - image
*           - description
*          properties:
*           name:
*            type: string
*           facebookUrl:
*            type: string
*           instagramUrl:
*            type: string
*           linkedinUrl:
*            type: string
*           image:
*            type: string
*           description:
*            type: string
*     security:
*      - bearerAuth: {}
*     responses:
*       201:
*         description: Member created successfully
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
*                   $ref: '#/components/schemas/Member'
*/
router.post('/', auth, uploadImage('image'), validateSchema(memberSchema), post)

/**
* @swagger
* /members:
*   get:
*     summary: List all members
*     description: List all members
*     tags: [Members]
*     security:
*      - bearerAuth: {}
*     responses:
*       200:
*         description: Members listed successfully
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
*                   $ref: '#/components/schemas/Member'
*/
router.get('/', auth, isAdmin, list)

/**
* @swagger
* /members/{id}:
*   put:
*     summary: Update a member
*     description: Update a member
*     tags: [Members]
*     parameters:
*      - in: path
*        name: id
*        description: Member id
*        required: true
*      - in: body
*        name: body
*        required: true
*        schema:
*          type: object
*          properties:
*           name:
*            type: string
*           facebookUrl:
*            type: string
*           instagramUrl:
*            type: string
*           linkedinUrl:
*            type: string
*           image:
*            type: string
*           description:
*            type: string
*     security:
*      - bearerAuth: {}
*     responses:
*       200:
*         description: Member updated successfully
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
*                   $ref: '#/components/schemas/Member'
*/
router.put('/:id', auth, uploadImage('image'), validateSchema(updateMemberSchema), update)

/**
* @swagger
* /members/{id}:
*   delete:
*     summary: Delete a member
*     description: Delete a member
*     tags: [Members]
*     parameters:
*      - name: id
*        in: path
*        description: Member id
*        required: true
*     security:
*      - bearerAuth: {}
*     responses:
*       200:
*         description: Member deleted successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               example:
 *                   code: 200
 *                   status: true
 *                   message: "Member deleted successfully"
*/
router.delete('/:id', auth, destroy)

module.exports = router
