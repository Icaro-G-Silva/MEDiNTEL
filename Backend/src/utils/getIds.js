const Pacient = require('../models/Pacient')
const Doctor = require('../models/Doctor')

module.exports = {
    async getPacientId(rp) {
        const relatedPacient = await Pacient.findOne({where: {rp}})
        if(!relatedPacient || relatedPacient == null) return false
        else return relatedPacient.get('id')
    },
    async getDoctorId(crm) {
        const relatedDoctor = await Doctor.findOne({where: {crm}})
        if(!relatedDoctor || relatedDoctor == null) return false
        else return relatedDoctor.get('id')
    }
}