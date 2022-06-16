const request = require('supertest')
const  { expect } = require('chai')
const app = require('../app')
const { Contact } = require('../database/models')

const conctacts = [
  {
    name: 'John Doe',
    phone: '123456789',
    email: 'asd@asd.com',
    message: 'Hello'
  },
  {
    name: 'Jane Doe',
    phone: '123456789',
    email: 'aaa@aaa.com',
    message: 'Hello'
  }
]

describe('Contact', () => {
  let token
  before(async () => {
    request(app)
      .post('/auth/login')
      .send({
        email: 'ncrook0@yolasite.com',
        password: 'Test1234'
      })
      .end((err, res) => {
        expect(res).to.have.property('status', 200)
        expect(res.body.body).to.have.property('token')
        token = res.body.body.token
      })
    await Contact.bulkCreate(conctacts)
  })
  after(async () => {
    await Contact.destroy({ where: { name:"test"} })
  }
  )
  describe('GET /contacts', () => {
    it('should return a list of contacts', async () => {
      const res = await request(app)
        .get('/contacts')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      expect(res.body.body).to.be.an('array')
    })
  })

  describe('POST /contacts', () => {
    it('should create a new contact', async () => {
      const res = await request(app)
        .post('/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test',
          phone: '123456789',
          email: 'test@test.com',
          message: 'Hello'
        })
        .expect(201)
      expect(res.body.body).to.have.property('name', 'test')
      expect(res.body.body).to.have.property('phone', '123456789')
      expect(res.body.body).to.have.property('email', 'test@test.com')
      expect(res.body.body).to.have.property('message', 'Hello')
    })
  })

  //ERRORS
  describe('GET /contacts  without token', () => {
    it('should return a 401 error', async () => {
      const res = await request(app)
        .get('/contacts')
      expect(res).to.have.property('status', 401)
      expect(res.body).to.have.property('message', 'No authorization header')
    }
    )
  }
  )
  describe('POST /contacts without token', () => {
    it('should return a 401 error', async () => {
      const res = await request(app)
        .post('/contacts')
        .send({
          name: 'test',
          phone: '123456789',
          email: 'test@test.com',
          message: 'Hello'
        })
      expect(res).to.have.property('status', 401)
      expect(res.body).to.have.property('message', 'No authorization header')
    }
    )
  }
  )
  describe('POST /contacts with invalid fields', () => {
    it('should return a 400 error', async () => {
      const res = await request(app)
        .post('/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test',
          phone: '123456789',
          email: '',
          message: 'Hello'
        }) 
      expect(res).to.have.property('status', 400)
      expect(res.body).to.have.property('status', false)
      expect(res.body).to.have.property('errors').to.be.instanceOf(Array)
    })
  }
  )

})

