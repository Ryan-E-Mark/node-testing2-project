const Cars = require('./cars-model')
const db = require('../../data/dbConfig')

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

describe('Cars model', () => {
    describe('getAll()', () => {
        test('response contains all cars', async () => {
            const data = await Cars.getAll()
            expect(data).toHaveLength(4)
        })
    })
    describe('getById()', () => {
        test('response contains Tesla Model 3', async () => {
            const data = await Cars.getById(1)
            expect(data).toMatchObject({
                "make": "Tesla",
                "model": "Model 3",
                "year": "2020"
            })
        })
    })
    describe('insert()', () => {
        test('response contains newly inserted car', async () => {
            const newCar = {
                "make": "Subaru",
                "model": "Outback XT",
                "year": "2009"
            }
            const data = await Cars.insert(newCar)
            expect(data).toMatchObject({
                "make": "Subaru",
                "model": "Outback XT",
                "year": "2009"
            })
        })
    })
    describe('update()', () => {
        test('response contains newly updated car', async () => {
            const updatedCar = {
                "make": "Tesla",
                "model": "Model S Plaid",
                "year": "2020"
            }
            const data = await Cars.update(1, updatedCar)
            expect(data).toMatchObject(updatedCar)
        })
    })
})