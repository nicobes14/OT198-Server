const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { Member } = require('../database/models')

const member = [
    {
    name: 'test1',
    image: '/images/member1.png',
    description: 'Member content 1',
},
{
    name: 'test2',
    image: '/images/member2.png',
    description: 'Member content 2',
}
]
let token
describe('Members', () => {
  before(async () => {
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
      })
      console.log('Este es el token!! :', token)
    await Member.bulkCreate(member)
  })
  after(async () => {
    await Member.destroy({ where: { name: 'test1' } })
  }
  )
  describe('GET /members', () => {
    it('should return a list of members', async () => {
      const res = await request(app)
        .get('/members')
        .set('Authorization', 'Bearer '+token)
        .expect(200)
        expect(res.body.body).to.have.property('members').to.be.instanceOf(Array)
    })
  })
})
let memberId
  describe('POST /members', () => {
    it('should create a new member', async () => {
      const res = await request(app)
        .post('/members')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'test',
            image: '/images/memberTest.png',
            description: 'test'
        })
        .expect(201)
        expect(res.body.body).to.have.property('name', 'test')
        expect(res.body.body).to.have.property('image', '/images/memberTest.png')
        expect(res.body.body).to.have.property('description', 'test')
        memberId = res.body.body.id
    })
  })
  describe('PUT /members/:id', () => {
    it('should update a membrer', async () => {
      const res = await request(app)
        .put('/members/'+memberId)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'test',
            image: 'Image 3',
            description: 'Content 3'
          })
      .expect(200)
      expect(res.body.body).to.have.property('name', 'test')
      expect(res.body.body).to.have.property('image', 'Image 3')
      expect(res.body.body).to.have.property('description', 'Content 3')
    })
  })
  describe('DELETE /members/:id', () => {
    it('should delete a member', async () => {
      const res = await request(app)
      .delete('/members/'+memberId)
      .set('Authorization', `Bearer ${token}`)
      expect(res).to.have.property('status', 200)
      expect(res.body).to.have.property('message', 'Member deleted')
    })
  })

// ERRORES 
describe('GET /members without token', () => {
  it('should return a 401 error', async () => {
    const res = await request(app)
    .get('/members')
    expect(res).to.have.property('status', 401)
    expect(res.body).to.have.property('message', 'No authorization header')
  })
})
describe('POST /members with invalid fields', () => {
      it('should return a 400 error', async () => {
        const res = await request(app)
          .post('/members')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'test',
            image:'  ',
            description:'test invalid fields'
          }) 
        expect(res).to.have.property('status', 400)
        expect(res.body).to.have.property('errors').to.be.instanceOf(Array)
      })
    }
    )
    describe('DELETE /members/:id without token', () => {
      it('should return a 401 error', async () => {
          const res = await request(app)
              .delete('/members/100')
          expect(res).to.have.property('status', 401)
          expect(res.body).to.have.property('message', 'No authorization header')
          }
      )
    }
  )
    describe('DELETE /members/:id no exist', () => {
      it('should return a 404 error', async () => {
          const res = await request(app)
              .delete('/members/100')
              .set('Authorization', `Bearer ${token}`)
          expect(res).to.have.property('status', 404)
          expect(res.body).to.have.property('message', `Member not found`)
          }
      )
    }
  )
