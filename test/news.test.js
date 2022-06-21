const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')
const path = require('path')
const { New, Category } = require('../database/models')

// User with Admin role
const user = {
    email: 'ncrook0@yolasite.com',
    password: 'Test1234'
}

// User without Admin role
const notAdminUser = {
    email: 'mlabern1@army.mil',
    password: 'Test1234'
}

const newData = {
    name: 'Test new',
    content: 'Test new content',
    image: '/images/imageTest.png',
}

var token
var idNews
var countNews

describe('News', () => {
    // Login user
    before((done) => {
        request(app)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
            expect(res).to.have.property('status', 200)
            token = res.body.body.token
            done()
        })
    })
    before((done) => {
        request(app)
        .post('/auth/login')
        .send(notAdminUser)
        .end((err, res) => {
            expect(res).to.have.property('status', 200)
            notAdminToken = res.body.body.token
            done()
        })
    })
    // Create a new category
    before((done) => { 
        request(app)
        .post('/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Test category',
            description: 'Test description'
        })
        .end((err, res) => {
            expect(res).to.have.property('status', 201)
            expect(res.body).to.have.property('message', 'Category created')
            newData.categoryId = res.body.body.id
            done()
        })
    })
    // Delete data that was created
    after( async () => {
        const removeNews = await New.destroy({
            where: { id: idNews },
            force: true
        })
        const removeCategory = await Category.destroy({
            where: { id: newData.categoryId },
            force: true
        })
        return removeNews && removeCategory
    })
    describe('POST /news', () => { 
        it('should create a new news', (done) => {
            request(app)
            .post('/news')
            .set('Authorization', `Bearer ${token}`)
            .field('name', newData.name)
            .field('content', newData.content)
            .field('categoryId', newData.categoryId)
            .attach('image', path.join(__dirname, newData.image))
            .end((err, res) => {
                expect(res).to.have.property('status', 201)
                expect(res.body).to.have.property('message', 'New created')
                idNews = res.body.body.id
                done()
            })
        })
    })
    describe('POST /news with errors', () => { 
        // Test POST /news with validation errors
        it('should return a 400 error', (done) => {
            request(app)
            .post('/news')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: '  ', content: '   ' })
            .end((err, res) => {
                expect(res).to.have.property('status', 400)
                expect(res.body.errors).to.be.an('array')
                done()
            })
        })
        // Test POST /news without headers
        it('should return a 401 error. Without headers', (done) => {
            request(app)
            .post('/news')
            .end((err, res) => {
                expect(res).to.have.property('status', 401)
                expect(res.body).to.have.property('message', 'No authorization header')
                done()
            })
        })
        // Test POST /news without admin role
        it('should return a 401 error. Not admin role', (done) => {
            request(app)
            .post('/news')
            .set('Authorization', `Bearer ${notAdminToken}`)
            .end((err, res) => {
                expect(res).to.have.property('status', 401)
                expect(res.body).to.have.property('message', 'You are not an admin')
                done()
            })
        })
    })
    describe('GET /news', () => { 
        it('should return a list of news',(done) => { 
            request(app)
            .get('/news')
            .end((err, res) => {
                expect(res).to.have.property('status', 200)
                expect(res.body.body.news).to.be.an('array')
                done()
            })
        })
    })
    describe('GET /news/{id}', () => { 
        it('should return a news by id',(done) => { 
            request(app)
            .get(`/news/${idNews}`)
            .end((err, res) => {
                expect(res).to.have.property('status', 200)
                expect(res.body).to.have.property( 'message', 'successfully retrieved')
                done()
            })
        })
    })
    describe('GET /news/{id} with errors', () => {
        // Test GET /news/{id} with id not found
        it('should return a 404 error', (done) => { 
            request(app)
            .get(`/news/0`)
            .end((err, res) => {
                expect(res).to.have.property('status', 404)
                expect(res.body).to.have.property('message', `New not found`)
                done()
            })
        })
     })
    describe('GET /news/{id}/comments', () => { 
        it('should return comments by news id',(done) => { 
            request(app)
            .get(`/news/${idNews}/comments`)
            .set('Authorization', `Bearer ${notAdminToken}`)
            .end((err, res) => {
                expect(res).to.have.property('status', 200)
                expect(res.body).to.have.property('message', `Comments of new with id ${idNews} listed`)
                done()
            })
        })
    })
    describe('GET /news/{id}/comments with errors', () => { 
        // Test GET /news/{id}/comments with id not found
        it('should return a 404 error', (done) => { 
            request(app)
            .get(`/news/0/comments`)
            .set('Authorization', `Bearer ${notAdminToken}`)
            .end((err, res) => {
                expect(res).to.have.property('status', 404)
                expect(res.body).to.have.property('message', `There is no news with id 0`)
                done()
            })
        })
    })
    describe('PUT /news/{id}', () => { 
        it('should update a news by id', (done) => { 
            request(app)
            .put(`/news/${idNews}`)
            .set('Authorization', `Bearer ${token}`)
            .field('name', 'Test new edited')
            .field('content', newData.content)
            .field('categoryId', newData.categoryId)
            .attach('image', path.join(__dirname, newData.image))
            .end((err, res) => {
                expect(res).to.have.property('status', 200)
                expect(res.body).to.have.property('message', 'New updated')
                done()
            })
        })
    })
    describe('PUT /news with errors', () => {
        // Test PUT /news with id not found
        it('should return a 404 error', (done) => { 
            request(app)
            .put(`/news/0`)
            .set('Authorization', `Bearer ${token}`)
            .field('name', 'Test new edited')
            .field('content', newData.content)
            .field('categoryId', newData.categoryId)
            .attach('image', path.join(__dirname, newData.image))
            .end((err, res) => {
                expect(res).to.have.property('status', 404)
                expect(res.body).to.have.property('message', `New 0 not found`)
                done()
            })
        })
        // Test PUT /news with validation errors
        it('should return a 400 error', (done) => {
            request(app)
            .put(`/news/${idNews}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: '  ', content: '   ' })
            .end((err, res) => {
                expect(res).to.have.property('status', 400)
                expect(res.body.errors).to.be.an('array')
                done()
            })
        })
        // Test PUT /news without headers
        it('should return a 401 error. Without headers', (done) => {
            request(app)
            .put(`/news/${idNews}`)
            .end((err, res) => {
                expect(res).to.have.property('status', 401)
                expect(res.body).to.have.property('message', 'No authorization header')
                done()
            })
        })
        // Test PUT /news without admin role
        it('should return a 401 error. Not admin role', (done) => {
            request(app)
            .put(`/news/${idNews}`)
            .set('Authorization', `Bearer ${notAdminToken}`)
            .end((err, res) => {
                expect(res).to.have.property('status', 401)
                expect(res.body).to.have.property('message', 'You are not an admin')
                done()
            })
        })
    })
    describe('DELETE /news/{id}', () => { 
        it('should delete a news by id', (done) => { 
            request(app)
            .delete(`/news/${idNews}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.property('status', 200)
                expect(res.body).to.have.property('message', 'New deleted')
                done()
            })
        })
    })
    describe('DELETE /news with errors', () => {
        // Test DELETE /news/{id} with id not found
        it('should return a 404 error', (done) => { 
            request(app)
            .delete(`/news/0`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.property('status', 404)
                expect(res.body).to.have.property('message', `New 0 not found`)
                done()
            })
        })
         // Test DELETE /news/{id} without headers
         it('should return a 401 error. Without headers', (done) => {
            request(app)
            .delete(`/news/${idNews}`)
            .end((err, res) => {
                expect(res).to.have.property('status', 401)
                expect(res.body).to.have.property('message', 'No authorization header')
                done()
            })
        })
        // Test DELETE /news/{id} without admin role
        it('should return a 401 error. Not admin role', (done) => {
            request(app)
            .delete(`/news/${idNews}`)
            .set('Authorization', `Bearer ${notAdminToken}`)
            .end((err, res) => {
                expect(res).to.have.property('status', 401)
                expect(res.body).to.have.property('message', 'You are not an admin')
                done()
            })
        })
    })
})