const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const BloodCount = require('../models/BloodCount')
const Eritograma = require('../models/Eritograma')
const Leucograma = require('../models/Leucograma')
const Plaquetario = require('../models/Plaquetario')

module.exports = {
    async hasDoctor(id = null, crm = null, login = null) {
        if(crm !== null) {
            var relatedDoctor = await Doctor.findOne({where: { crm } })
        }
        if(id !== null) {
            var relatedDoctor = await Doctor.findOne({ where: { id } })
        }
        if(login !== null) {
            var relatedDoctor = await Doctor.findOne({ where: { login } })
        }
        if(!relatedDoctor || relatedDoctor == null) return false
        else if(id === false || crm === false || login === false) return false
        else return true
        
    },
    async hasPatient(id = null, rp = null, login = null) {
        if(rp !== null) {
            var relatedPatient = await Patient.findOne({ where: { rp } })
        }
        if(id !== null) {
            var relatedPatient = await Patient.findOne({ where: { id } })
        }
        if(login !== null) {
            var relatedPatient = await Patient.findOne({ where: { login } })
        }
        if(!relatedPatient || relatedPatient == null) return false
        else if(id === false || rp === false || login === false) return false
        else return true
    },
    async hasBloodCount(id = null, requestNumber = null) {
        if(requestNumber !== null) {
            var relatedBloodCount = await BloodCount.findOne({ where: { requestNumber } })
        }
        if(id !== null) {
            var relatedBloodCount = await BloodCount.findOne({ where: { id } })
        }
        if(!relatedBloodCount || relatedBloodCount == null) return false
        else if(id === false || requestNumber === false) return false
        else return true
    },
    async hasEritograma(id = null, bloodCountId = null) {
        if(bloodCountId !== null) {
            var relatedEritograma = await Eritograma.findOne({ where: { bloodCountId } })
        }
        if(id !== null) {
            var relatedEritograma = await Eritograma.findOne({ where: { id } })
        }
        if(!relatedEritograma || relatedEritograma == null) return false
        else if(id === false || bloodCountId === false) return false
        else return true
    },
    async hasLeucograma(id = null, bloodCountId = null) {
        if(bloodCountId !== null) {
            var relatedLeucograma = await Leucograma.findOne({ where: { bloodCountId } })
        }
        if(id !== null) {
            var relatedLeucograma = await Leucograma.findOne({ where: { id } })
        }
        if(!relatedLeucograma || relatedLeucograma == null) return false
        else if(id === false || bloodCountId === false) return false
        else return true
    },
    async hasPlaquetario(id = null, bloodCountId = null) {
        if(bloodCountId !== null) {
            var relatedPlaquetario = await Plaquetario.findOne({ where: { bloodCountId } })
        }
        if(id !== null) {
            var relatedPlaquetario = await Plaquetario.findOne({ where: { id } })
        }
        if(!relatedPlaquetario || relatedPlaquetario == null) return false
        else if(id === false || bloodCountId === false) return false
        else return true
    }
}