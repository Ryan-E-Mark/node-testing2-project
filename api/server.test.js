const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe('[GET] /cars', () => {
    test('responds with all cars', async () => {
        const resp = await request(server).get('/api/cars')
        expect(resp.body).toHaveLength(4)
    })
    test('responds with 200 status', async () => {
        const resp = await request(server).get('/api/cars')
        expect(resp.status).toBe(200)
    })
})

describe('[GET] /cars/:id', () => {
    test('responds with car at the particular id', async () => {
        const resp = await request(server).get('/api/cars/1')
        expect(resp.body).toMatchObject({
            "id": 1,
            "make": "Tesla",
            "model": "Model 3",
            "year": "2020"
        })
    })
    test('responds with 200 status', async () => {
        const resp = await request(server).get('/api/cars/1')
        expect(resp.status).toBe(200)
    })
})

describe('[POST] /cars', () => {
    test('responds with newly posted car', async () => {
        const resp = await request(server).post('/api/cars')
        .send({
            "make": "Chevrolet",
            "model": "Corvette Stingray",
            "year": "2022"
        })
        expect(resp.body).toMatchObject({
            "make": "Chevrolet",
            "model": "Corvette Stingray",
            "year": "2022"
        })
    })
    test('responds with 201 status', async () => {
        const resp = await request(server).post('/api/cars')
        .send({
            "make": "Chevrolet",
            "model": "Corvette Stingray",
            "year": "2022"
        })
        expect(resp.status).toBe(201)
    })
})

describe('[PUT] /cars/:id', () => {
    test('responds with newly updated car', async () => {
        const resp = await request(server).put('/api/cars/1')
        .send({
            "make": "Tesla",
            "model": "Model S Plaid",
            "year": "2022"
        })
        expect(resp.body).toMatchObject({
            "make": "Tesla",
            "model": "Model S Plaid",
            "year": "2022"
        })
    })
    test('responds with 200 status', async () => {
        const resp = await request(server).put('/api/cars/1')
        .send({
            "make": "Tesla",
            "model": "Model S Plaid",
            "year": "2022"
        })
        expect(resp.status).toBe(200)
    })
})