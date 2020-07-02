const Patient = require('../models/Patient')
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
        else if(id === false || crm === false) return false
        else return true
        
    },
    async hasPatient(id = null, rp = null) {
        if(rp !== null) {
            var relatedPatient = await Patient.findOne({ where: { rp } })
        }
        if(id !== null) {
            var relatedPatient = await Patient.findOne({ where: { id } })
        }
        if(!relatedPatient || relatedPatient == null) return false
        else if(id === false || rp === false) return false
        else return true
    }
}