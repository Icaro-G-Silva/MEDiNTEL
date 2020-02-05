const Pacient = require('../models/Pacient')
const Doctor = require('../models/Doctor')

module.exports = {
    async hasDoctor(id) {
        const relatedDoctor = await Doctor.findAll({ where: { id } })
        if(!relatedDoctor) return false
        else return true
    },
    async hasPacient(id) {
        const relatedPacient = await Pacient.findAll({ where: { id } })
        if(!relatedPacient) return false
        else return true
    }
}