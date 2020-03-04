const Pacient = require('../models/Pacient')
const Doctor = require('../models/Doctor')

module.exports = {
    async hasDoctor(id) {
        const relatedDoctor = await Doctor.findOne({ where: { id } })
        if(!relatedDoctor) return false
        else if(relatedDoctor == null) return false
        else return true
    },
    async hasPacient(id) {
        const relatedPacient = await Pacient.findOne({ where: { id } })
        if(!relatedPacient) return false
        else if(relatedPacient == null) return false
        else return true
    }
}