const Patient = require('../models/Patient')
const BloodCount = require('../models/BloodCount')
const { validateDocument } = require('../utils/verifyCPF')
const { verifyCRM } = require('../utils/verifyCRM')
const { hasDoctor, hasPatient } = require('../utils/hasRegister')
const { getDoctorId, getPatientId } = require('../utils/getIds')
const { createPatientId, createHash } = require('../utils/createHashes')
const auth = require('../utils/authentication')
const { PatientErrors, DoctorErrors } = require('../utils/errorTexts')
const patientErrors = new PatientErrors()
const doctorErrors = new DoctorErrors()

module.exports = {
    async index(req, res) {
        const patients = await Patient.findAll({
            include: { association: 'doctor' }
        }).catch(error => {
            return res.status(400).json({ error: patientErrors.errorAtController(error) })
        })
        return res.status(200).json(patients)
    },
    async indexSpecific(req, res) {
        const id = await getPatientId(parseInt(req.params.rp))
        if(!await hasPatient(id)) return res.status(404).json({error: patientErrors.notFound})

        const patient = await Patient.findByPk(id, {
            include: { association: 'doctor' }
        }).catch(error => {
            return res.status(400).json({ error: patientErrors.errorAtController(error) })
        })
        if(patient) return res.status(200).json(patient)
        else return res.status(404).json({error: patientErrors.notFound})
    },
    async indexDoctor(req, res) {
        const id = await getPatientId(parseInt(req.params.rp))
        if(!await hasPatient(id)) return res.status(404).json({error: patientErrors.notFound})

        const patients = await Patient.findByPk(id, {
            include: { association: 'doctor' }
        }).catch(error => {
            return res.status(400).json({ error: patientErrors.errorAtController(error) })
        })
        if(patients) return res.status(200).json(patients.doctor)
        else return res.status(404).json({error: patientErrors.notFound})
    },
    async store(req, res) {
        const { doctorCRM } = req.body
        const { rp, name, surname, idDocument, birth, sex, login, password, accessLevel } = req.body
        
        if(await hasPatient(null, rp)) return res.status(400).json({error: patientErrors.isAlreadyRegistered})
        if(!validateDocument(idDocument)) return res.status(400).json({error: patientErrors.invalidDocument})
        if(await hasPatient(null, null, login) || await hasDoctor(null, null, login)) return res.status(400).json({error: patientErrors.login.isAlreadyRegistered})

        if(doctorCRM !== null) {
            if(!await verifyCRM(doctorCRM)) res.status(400).json({error: doctorErrors.invalidCRM})
            const crmSliced = doctorCRM.replace('/', '')
            var doctorId = await getDoctorId(crmSliced)
            if(!doctorId) return res.status(404).json({error: patientErrors.crmNotFound})
            if(!await hasDoctor(doctorId)) return res.status(404).json({error: doctorErrors.notFound})
        }
        else var doctorId = null

        const id = await createPatientId()
        const passwordHashed = await createHash(password)
        
        const patient = await Patient.create({
            id,
            rp,
            name,
            surname,
            idDocument,
            birth,
            sex,
            login,
            password: passwordHashed,
            accessLevel,
            doctorId
        }).catch(error =>{
            return res.status(400).json({ error: patientErrors.errorAtController(error) })
        })
        const token = auth.sign({id, accessLevel})
        return res.status(200).json({patient, token})
    },
    async update(req, res) {
        const { rp, name, surname, idDocument, birth, sex, login, password, accessLevel, doctorCRM } = req.body

        const id = await getPatientId(parseInt(req.params.rp))
        if(!await hasPatient(id)) return res.status(404).json({error: patientErrors.notFound})
        if(!validateDocument(idDocument)) return res.status(400).json({error: patientErrors.invalidDocument})
        if(await hasDoctor(null, null, login)) return res.status(400).json({error: patientErrors.login.isAlreadyRegistered})

        if(doctorCRM !== null) {
            if(!await verifyCRM(doctorCRM)) res.status(400).json({error: doctorErrors.invalidCRM})
            const crmSliced = doctorCRM.replace('/', '')
            var doctorId = await getDoctorId(crmSliced)
            if(!doctorId) return res.status(404).json({error: patientErrors.crmNotFound})
            if(!await hasDoctor(doctorId)) return res.status(404).json({error: doctorErrors.notFound})
        }
        else var doctorId = null

        const passwordHashed = await createHash(password)

        const patient = await Patient.update({
            rp,
            name,
            surname,
            idDocument,
            birth,
            sex,
            login,
            password: passwordHashed,
            accessLevel,
            doctorId
        }, {
            where: {id}
        }).catch(error =>{
            return res.status(400).json({ error: patientErrors.errorAtController(error) })
        })
        return res.status(200).json({ message: 'Updated Successfully' })
    },
    async delete(req, res) {
        const id = await getPatientId(parseInt(req.params.rp))
        if(!await hasPatient(id)) return res.status(404).json({error: patientErrors.notFound})

        const patient = await Patient.destroy({where:{id}}).catch(error =>{
            return res.status(400).json({ error: patientErrors.errorAtController(error) })
        })
        return res.status(200).json({ message: 'Deleted Successfully' })
    },
    async indexSpecificBloodCount(req, res) {
        const id = await getPatientId(parseInt(req.params.rp))
        if(!await hasPatient(id)) return res.status(404).json({error: patientErrors.notFound})

        const bloodCounts = await BloodCount.findAll({where: {patientId: id}, include: {all: true}}).catch(error => {
            res.status(400).json({ error: patientErrors.errorAtController(error) })
        })
        res.status(200).json(bloodCounts)
    }
}
