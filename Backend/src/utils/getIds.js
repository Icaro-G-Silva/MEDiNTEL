const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const BloodCount = require('../models/BloodCount')

module.exports = {
    async getPatientId(rp) {
        const relatedPatient = await Patient.findOne({where: {rp}})
        return !relatedPatient || relatedPatient == null ? false : relatedPatient.get('id')
    },
    async getDoctorId(crm) {
        const relatedDoctor = await Doctor.findOne({where: {crm}})
        return !relatedDoctor || relatedDoctor == null ? false : relatedDoctor.get('id')
    },
    async getBloodCountId(requestNumber) {
        const relatedBloodCount = await BloodCount.findOne({where: {requestNumber}})
        return !relatedBloodCount || relatedBloodCount == null ? false : relatedBloodCount.get('id')
    }
}