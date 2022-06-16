const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { Testimonial } = require('../database/models')

const dummyTestimonials = [
    {
      name: 'Testimonial 1',
      image: '/images/testimonial1.png',
      content: 'Testimonial content 1',
    },
    {
        name: 'Testimonial 2',
        image: '/images/testimonial2.png',
        content: 'Testimonial content 2',
    },
  ]

describe('testimonials', () => {
    let authToken;

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
            authToken = res.body.body.token
        })
        await Testimonial.destroy({ where: {},force: true })
        await Testimonial.bulkCreate(dummyTestimonials)
        
    })

    after(async () => {
        await Testimonial.destroy({ where: {},force: true })
    })

    describe('GET /testimonials', () => {
        it('should return a list of testimonials', async () => {
            
            const response = await (await request(app)
                .get('/testimonials')
                .set('Authorization','Bearer '+authToken))
            expect(response).to.have.property('status', 200)
            expect(response.body.body).to.have.property('testimonials').to.be.instanceOf(Array)
            })
        }
    )
    let testimonialId
    describe('POST /testimonials', () => {
        it('should create a new testimonial', async () => {
            const response = await (await request(app)
                .post('/testimonials')
                .set('Authorization','Bearer '+authToken)
                .field('name', 'Testimonial 3')
                .field('content', 'Testimonial content 3')
                .attach('image', __dirname + "/images/testimonial1.png"))
            expect(response).to.have.property('status', 201)
            expect(response.body.body).to.have.property('name', 'Testimonial 3')
            expect(response.body.body).to.have.property('content', 'Testimonial content 3')
            expect(response.body.body).to.have.property('image')
            testimonialId = response.body.body.id
            })})


    describe('PUT /testimonials/:id', () => {
        it('should update a testimonial', async () => {
            const response = await (await request(app)
                .put('/testimonials/'+testimonialId)
                .set('Authorization','Bearer '+authToken)
                .field('name', 'Testimonial 3')
                .field('content', 'Testimonial content 3')
                .attach('image', __dirname + "/images/testimonial1.png"))
            expect(response).to.have.property('status', 200)
            expect(response.body.body).to.have.property('name', 'Testimonial 3')
            expect(response.body.body).to.have.property('content', 'Testimonial content 3')
            expect(response.body.body).to.have.property('image')
            })})

    describe('DELETE /testimonials/:id', () => {
        it('should delete a testimonial', async () => {
            const response = await (await request(app)
                .delete('/testimonials/'+testimonialId)
                .set('Authorization','Bearer '+authToken))
            expect(response).to.have.property('status', 200)
            expect(response.body).to.have.property('message', 'Testimonial deleted successfully')
            }
        )}
    )

    describe('DELETE /testimonials/:id no exist', () => {
        it('should return a 404 error', async () => {
            const response = await (await request(app)
                .delete('/testimonials/100')
                .set('Authorization','Bearer '+authToken))
            expect(response).to.have.property('status', 404)
            expect(response.body).to.have.property('message', 'Testimonial not found')
            }
        )}
    )

    describe('PUT /testimonials/:id no exist', () => {
        it('should return a 404 error', async () => {
            const response = await (await request(app)
                .put('/testimonials/100')
                .set('Authorization','Bearer '+authToken)
                .field('name', 'Testimonial 3')
                .field('content', 'Testimonial content 3')
                .attach('image', __dirname + "/images/testimonial1.png"))
            expect(response).to.have.property('status', 404)
            expect(response.body).to.have.property('message', 'Testimonial with id 100 not found')
            }
        )}
    )

    describe('POST /testimonials no name or content', () => {
        it('should return a 400 error', async () => {
            const response = await (await request(app)
                .post('/testimonials')
                .set('Authorization','Bearer '+authToken)
                .attach('image', __dirname + "/images/testimonial1.png"))
            expect(response).to.have.property('status', 400)
            expect(response.body).to.have.property('status', false)
            expect(response.body).to.have.property('errors').to.be.instanceOf(Array)
            }
        )}
    )

    describe('POST /testimonials name or content as int', () => {
        it('should return a 400 error', async () => {
            const response = await (await request(app)
                .post('/testimonials')
                .set('Authorization','Bearer '+authToken)
                .send({
                    name: 1,
                    content: 1
                }))
            expect(response).to.have.property('status', 400)
            expect(response.body).to.have.property('status', false)
            expect(response.body).to.have.property('errors').to.be.instanceOf(Array)
            }
        )}
    )

    describe('POST /testimonials without token', () => {
        it('should return a 401 error', async () => {
            const response = await (await request(app)
                .post('/testimonials')
                .field('name', 'Testimonial 3')
                .field('content', 'Testimonial content 3')
                .attach('image', __dirname + "/images/testimonial1.png"))
            expect(response).to.have.property('status', 401)
            expect(response.body).to.have.property('message', 'No authorization header')
            }
        )}
    )

    describe('POST /testimonials with invalid token', () => {
        it('should return a 401 error', async () => {
            const response = await (await request(app)
                .post('/testimonials')
                .set('Authorization','Bearer '+'invalidtoken')
                .field('name', 'Testimonial 3')
                .field('content', 'Testimonial content 3')
                .attach('image', __dirname + "/images/testimonial1.png"))
            expect(response).to.have.property('status', 401)
            expect(response.body).to.have.property('message', 'jwt malformed')
            }
        )}
    )




})

