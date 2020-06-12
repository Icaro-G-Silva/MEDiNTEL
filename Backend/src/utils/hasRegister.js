const Pacient = require('../models/Pacient')
const Doctor = require('../models/Doctor')

module.exports = {
    async hasDoctor(id = null, crm = null) {
        if(crm !== null) {
            var relatedDoctor = await Doctor.findOne({where: {crm}})
        }
        if(id !== null) {
            var relatedDoctor = await Doctor.findOne({ where: { id } })
        }
        if(!relatedDoctor || relatedDoctor == null) return false
        else return true
        
    },
    async hasPacient(id = null, rp = null) {
        if(rp !== null) {
            var relatedPacient = await Pacient.findOne({ where: { rp } })
        }
        if(id !== null) {
            var relatedPacient = await Pacient.findOne({ where: { id } })
        }
        if(!relatedPacient || relatedPacient == null) return false
        else return true
    }
}