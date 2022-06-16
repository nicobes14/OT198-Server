const request = require('supertest')
const  { expect } = require('chai')
const app = require('../app')
const { Activity } = require('../database/models')

const activities = [
  {
    name: 'test',
    image: '/images/activity1.jpg',
    content: 'Content 1'
  },
  {
    name: 'test',
    image: '/images/activity2.jpg',
    content: 'Content 2'
  }
]

describe('Activity', () => {
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
    await Activity.bulkCreate(activities)
  })

  after(async () => {
    await Activity.destroy({ where: { name:"test"} })
  }
  )

  let activityId
  describe('POST /activities', () => {
    it('should create an activity', async () => {
      const response = await request(app)
        .post('/activities')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test',
          image: 'Image 3',
          content: 'Content 3'
        })
      expect(response).to.have.property('status', 201)
      expect(response.body.body).to.have.property('name', 'test')
      expect(response.body.body).to.have.property('image', 'Image 3')
      expect(response.body.body).to.have.property('content', 'Content 3')
      activityId = response.body.body.id
    } 
    )
  })
  describe('PUT /activities', () => {
    it('should update an activity', async () => {
      const response = await request(app)
        .put('/activities/' + activityId)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test',
          image: 'Image updated',
          content: 'Content updated'
        })
      expect(response).to.have.property('status', 200)
      expect(response.body.body).to.have.property('name', 'test')
      expect(response.body.body).to.have.property('image', 'Image updated')
      expect(response.body.body).to.have.property('content', 'Content updated')
    } 
    )
  })

  // ERRORS
  describe('POST /activities invalid fields', () => {
    it('should return an error if there ir an invalid field', async () => {
      const response = await request(app)
        .post('/activities')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          image: 'Image 3',
          content: 'Content 3',
        })
      expect(response).to.have.property('status', 400)
      expect(response.body).to.have.property('status', false)
      expect(response.body).to.have.property('errors').to.be.instanceOf(Array)
    }
    )
  }
  )
  describe('POST /activities without token', () => {
    it('should return an error if there is no token', async () => {
      const response = await request(app)
        .post('/activities')
        .send({
          name: 'test',
          image: 'Image 3',
          content: 'Content 3',
        })
      expect(response).to.have.property('status', 401)
      expect(response.body).to.have.property('status', false)
      expect(response.body).to.have.property('message', 'No authorization header')
    }
    )
  }
  )

  describe('PUT /activities/:id id not found', () => {
    it('should return an error if id does not exist', async () => {
      const response = await request(app)
        .put(`/activities/${activityId + 1}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test',
          image: 'Image updated',
          content: 'Content updated'
        })
      expect(response).to.have.property('status', 404)
      expect(response.body).to.have.property('status', false)
      expect(response.body).to.have.property('message', `Activity ${activityId + 1} not found`)
    }
    )
  }
  )

  describe('PUT /activities invalid fields', () => {
    it('should return an error if there ir an invalid field', async () => {
      const response = await request(app)
      .put(`/activities/${activityId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          image: 'Image 3',
          content: 'Content 3',
        })
      expect(response).to.have.property('status', 400)
      expect(response.body).to.have.property('status', false)
      expect(response.body).to.have.property('errors').to.be.instanceOf(Array)
    }
    )
  }
  )
  describe('PUT /activities without token', () => {
    it('should return an error if there is no token', async () => {
      const response = await request(app)
        .put(`/activities/${activityId}`)
        .send({
          name: 'test',
          image: 'Image 3',
          content: 'Content 3',
        })
      expect(response).to.have.property('status', 401)
      expect(response.body).to.have.property('status', false)
      expect(response.body).to.have.property('message', 'No authorization header')
    }
    )
  }
  )

})



      
