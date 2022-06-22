const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { User } = require('../database/models')

const newUser = {
    firstName: 'Test3',
    lastName: 'Test3',
    email: 'testeando@test.com',
    password: 'Test1234',
}

let token
let adminID
let newUserToken
let newUserId

describe('Users', () => {
    before((done) => {
      request(app)
        .post('/auth/login')
        .send({
          email: 'uatterbury2@eepurl.com',
          password: 'Test1234'
        })
        .end((err, res) => {
            expect(res).to.have.property('status', 200)
            expect(res.body.body).to.have.property('token')
            token = res.body.body.token
            adminID = res.body.body.user.id
            done()  
        })
    })
    before((done) => {
        request(app)
          .post('/auth/register')
          .send(newUser)
          .end((err, res) => {
              expect(res).to.have.property('status', 201)
              expect(res.body.body).to.have.property('userToken')
              done()
          })
      })
      before((done) => {
        request(app)
          .post('/auth/login')
          .send(newUser)
          .end((err, res) => {
              expect(res).to.have.property('status', 200)
              expect(res.body.body).to.have.property('token')
              newUserToken = res.body.body.token
              newUserId = res.body.body.user.id
              done()  
          })
      })
    after(async () => {
    await User.destroy({ where: { id: newUserId }, force: true})
    })
    describe('GET /users', () => {
        it('should return a list of users', async () => {
            const res = await request(app)
            .get('/users')
            .set('Authorization', 'Bearer '+token)
            .expect(200)
            expect(res.body.body).to.be.instanceOf(Array)
        })
    })

    describe('PUT /users/:id', () => {
        it('should update a user', async () => {
            const res = await request(app)
            .put('/users/'+adminID)
            .set('Authorization', 'Bearer '+token)
            .send({
                firstName: 'Test',
                lastName: 'Test',
                email: 'uatterbury2@eepurl.com',
                password: 'Test1234',
            })
            .expect(200)
            expect(res.body.body).to.have.property('firstName', 'Test')
            expect(res.body.body).to.have.property('lastName', 'Test')
            expect(res.body.body).to.have.property('email', 'uatterbury2@eepurl.com')
        })
    }
    )

    describe('DELETE /users/:id', () => {
        it('should delete a user', async () => {
            const res = await request(app)
            .delete('/users/'+newUserId)
            .set('Authorization', 'Bearer '+token)
            .expect(200)
            expect(res.body).to.have.property('message', 'User deleted')
            
        })
    })

    //ERRORES
    describe('GET /users sin token', () => {
        it('should return a 401 error', async () => {
            const res = await request(app)
            .get('/users')
            expect(res).to.have.property('status', 401)
        }) 
    })
    describe('GET /users without admin', () => {
        it('should return a 401 error', async () => {
            const res = await request(app)
            .get('/users')
            .set('Authorization', 'Bearer '+newUserToken)
            expect(res).to.have.property('status', 401)
            expect(res.body).to.have.property('message', 'You are not an admin')
        })
    })
    describe('PUT /users/:id id invalid', () => {
        it('should return a 404 error', async () => {
            const res = await request(app)
            .put('/users/'+newUserId+1)
            .set('Authorization', 'Bearer '+token)
            .send({
                firstName: 'Test',
                lastName: 'Test',
                email: 'ncrook0@yolasite.com',
                password: 'Test1234',
            })
            expect(res).to.have.property('status', 404)
            expect(res.body).to.have.property('message', 'User not found')
        })
    })
    describe('PUT /users/:id without admin', () => {
        it('should return a 401 error', async () => {
            const res = await request(app)
            .put('/users/100')
            .set('Authorization', 'Bearer '+newUserToken)
            .send({
                firstName: 'Test',
                lastName: 'Test',
                email: 'ncrook0@yolasite.com',
                password: 'Test1234',
            })
            expect(res).to.have.property('status', 401)
            expect(res.body).to.have.property('message', 'You are not an admin')
        })
    })
    describe('DELETE /users/:id id invalid', () => {
        it('should return a 404 error', async () => {
            const res = await request(app)
            .delete('/users/100')
            .set('Authorization', 'Bearer '+token)
            expect(res).to.have.property('status', 404)
            expect(res.body).to.have.property('message', 'User not found')
        })
    })
    describe('PUT /users/:id with out body', () => {
        it('should return a 400 error', async () => {
            const res = await request(app)
            .put('/users/100')
            .set('Authorization', 'Bearer '+token)
            expect(res).to.have.property('status', 400)
            expect(res.body).to.have.property('errors').to.be.an('array')
        })
    })
})