const Eritograma = require('../models/Eritograma')
const Leucograma = require('../models/Leucograma')
const Plaquetario = require('../models/Plaquetario')
const { hasBloodCount } = require('./hasRegister')

async function getExam(bloodCountId, type) {
    var exam
    switch (type) {
        case 'eritograma':
            if(!await hasBloodCount(bloodCountId)) throw new Error(`The ID is wrong`)
            exam = await Eritograma.findOne({where: {bloodCountId}})
            return exam
        case 'leucograma':
            if(!await hasBloodCount(bloodCountId)) throw new Error(`The ID is wrong`)
            exam = await Leucograma.findOne({where: {bloodCountId}})
            return exam
        case 'plaquetario':
            if(!await hasBloodCount(bloodCountId)) throw new Error(`The ID is wrong`)
            exam = await Plaquetario.findOne({where: {bloodCountId}})
            return exam
        default:
            throw new Error(`Wrong option from 'GetExam' on 'hasChildIn'`)
    }
}

module.exports = {
    async hasEritogramaIn(bloodCountId) {
        const exam = await getExam(bloodCountId, 'eritograma')
        if(!exam) return false
        else return true
    },
    async hasLeucogramaIn(bloodCountId) {
        const exam = await getExam(bloodCountId, 'leucograma')
        if(!exam) return false
        else return true
    },
    async hasPlaquetarioIn(bloodCountId) {
        const exam = await getExam(bloodCountId, 'plaquetario')
        if(!exam) return false
        else return true
    }
}