const db = require('../../data/dbConfig')

function getAll() {
    const result = db('cars')
    return result
}

async function getById(id) {
    const result = await db('cars').where('id', id).first()
    return result 
}

async function insert(car) {
    const [newCarId] = await db('cars').insert(car)
    return db('cars').where('id', newCarId).first()
}

async function update(id, car) {
    const updatedCar = await db('cars').where('id', id).update(car)
    return await db('cars').where('id', updatedCar).first()
}

module.exports = {
    getAll,
    getById,
    insert,
    update
}