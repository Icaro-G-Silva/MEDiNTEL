const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const BloodCount = require('../models/BloodCount')

module.exports = {
    async getPatientId(rp) {
        const relatedPatient = await Patient.findOne({where: {rp}})
        if(!relatedPatient || relatedPatient == null) return false
        else return relatedPatient.get('id')
    },
    async getDoctorId(crm) {
        const relatedDoctor = await Doctor.findOne({where: {crm}})
        if(!relatedDoctor || relatedDoctor == null) return false
        else return relatedDoctor.get('id')
    },
    async getBloodCountId(requestNumber) {
        const relatedBloodCount = await BloodCount.findOne({where: {requestNumber}})
        if(!relatedBloodCount || relatedBloodCount == null) return false
        else return relatedBloodCount.get('id')
    }
}