const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')
const { User } = require('../database/models')

const newUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'testUser.email@test.com',
  password: 'testPassword123',
}

var token

describe('Auth', () => {
  after( async () => {
    // Delete the user that was created
    const result = await User.destroy({
      where: { email: newUser.email },
      force: true
    });
    return result
  })
  describe('POST /auth/register ', () => {
    it('should create a new user', (done) => {
      request(app)
      .post('/auth/register')
      .send(newUser)
      .end((err,res) => {
        expect(res).to.have.property('status', 201)
        expect(res.body).to.have.property('message', 'User created')
        expect(res.body.body).to.have.key('userToken')
        done()
      });
    })
  })
  
  // Test POST /auth/register with validation errors
  describe('POST /auth/register with error ', () => {
    it('should return a 400 error', (done) => {
      request(app)
      .post('/auth/register')
      .send({ username: 'test', password: 12345 })
      .end((err, res) => {
        expect(res).to.have.property('status', 400)
        expect(res.body.errors).to.be.an('array')
        done()
      })
    })
  })
  
  // Test POST /auth/register with a user that already exists 
  describe('POST /auth/register with error ', () => {
    it('should return a 409 error', (done) => {
      request(app)
      .post('/auth/register')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.property('status', 409)
        expect(res.body).to.have.property('message', 'Email already exists')
        done()
      })
    })
  })
  
  describe('POST /auth/login ', () => {
    it('should login a user', (done) => {
      request(app)
      .post('/auth/login')
      .send({
        email: newUser.email,
        password: newUser.password
      })
      .end((err, res) => {
        expect(res).to.have.property('status', 200)
        expect(res.body).to.have.property('message', 'User logged in')
        expect(res.body.body).to.have.keys('user', 'token')
        token = res.body.body.token
        done()
      })
    })
  })
  
  // Test POST /auth/login with wrong credentials
  describe('POST /auth/login with error', () => {
    it('should receive an error', (done) => {
      request(app)
      .post('/auth/login')
      .send({
        email: newUser.email,
        password: 'testWrongPassword'
      })
      .end((err, res) => {
        expect(res).to.have.property('status', 401)
        expect(res.body).to.have.property('message', 'Invalid credentials')
        done()
      })
    })
  })

  describe('GET /auth/me', () => {
    it('should return a user', (done) => {
      request(app)
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.property('status', 200)
          expect(res.body).to.have.property('message', 'User retrieved successfully')
          expect(res.body.body).to.have.property('id')
          expect(res.body.body).to.have.property('firstName', newUser.firstName)
          expect(res.body.body).to.have.property('lastName', newUser.lastName)
          expect(res.body.body).to.have.property('email', newUser.email)
          done()
        })
    })
  })

  // Test GET /auth/me without token
  describe('GET /auth/me without headers', () => {
    it('should return 401 error', (done) => {
      request(app)
        .get('/auth/me')
        .end((err, res) => {
          expect(res).to.have.property('status', 401)
          expect(res.body).to.have.property('message', 'No authorization header')
          done()
        })
    })
  })
})
