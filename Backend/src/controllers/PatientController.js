const Patient = require('../models/Patient')
const { validateDocument } = require('../utils/verifyCPF')
const { hasDoctor, hasPatient } = require('../utils/hasRegister')
const { getDoctorId, getPatientId } = require('../utils/getIds')
const { createPatientId, createHash } = require('../utils/createHashes')

module.exports = {
    async index(req, res) {
        const patients = await Patient.findAll({
            include: { association: 'doctor' }
        }).catch(error => {
            return res.status(400).json({ error })
        })
        return res.status(200).json(patients)
    },
    async indexSpecific(req, res) {
        const id = await getPatientId(parseInt(req.params.rp))
        if(!await hasPacient(id)) return res.status(400).json({error: 'Patient not found'})

        const patient = await Patient.findByPk(id, {
            include: { association: 'doctor' }
        }).catch(error => {
            return res.status(400).json({ error })
        })
        if(patient) return res.status(200).json(patient)
        else return res.status(400).json({error: 'Patient not found'})
    },
    async indexDoctor(req, res) {
        const id = await getPatientId(parseInt(req.params.rp))
        if(!await hasPatient(id)) return res.status(400).json({error: 'Patient not found'})

        const patients = await Patient.findByPk(id, {
            include: { association: 'doctor' }
        }).catch(error => {
            return res.status(400).json({ error })
        })
        if(patients) return res.status(200).json(patients.doctor)
        else return res.status(400).json({error: 'Patient not found'})
    },
    async store(req, res) {
        const { doctorCRM } = req.body
        const { rp, name, surname, idDocument, birth, sex, login, password, accessLevel } = req.body

        const crmSliced = doctorCRM.replace('/', '')
        
        if(await hasPatient(null, rp)) return res.status(400).json({error: 'Patient is already Registered'})
        if(!validateDocument(idDocument)) return res.status(400).json({error: 'Document invalid'})

        const doctorId = await getDoctorId(crmSliced)
        if(!doctorId) return res.status(400).json({error: "Doctor's crm not found"})
        if(!await hasDoctor(doctorId)) return res.status(400).json({error: 'Doctor not found'})

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
            return res.status(400).json({ error })
        })
        return res.status(200).json(patient)
    },
    async update(req, res) {
        const { rp, name, surname, idDocument, birth, sex, login, password, accessLevel, doctorCRM } = req.body

        const crmSliced = doctorCRM.replace('/', '')

        const id = await getPatientId(parseInt(req.params.rp))
        if(!await hasPatient(id)) return res.status(400).json({error: 'Patient not found'})
        if(!validateDocument(idDocument)) return res.status(400).json({error: 'Document invalid'})

        const doctorId = await getDoctorId(crmSliced)
        if(!doctorId) return res.status(400).json({error: "Doctor's crm not found"})
        if(!await hasDoctor(doctorId)) return res.status(400).json({error: 'Doctor not found'})

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
            return res.status(400).json({ error })
        })
        return res.status(200).json({ message: 'Updated Successfully' })
    },
    async delete(req, res) {
        const id = await getPatientId(parseInt(req.params.rp))
        if(!await hasPatient(id)) return res.status(400).json({error: 'Patient not found'})

        const patient = await Patient.destroy({where:{id}}).catch(error =>{
            return res.status(400).json({ error })
        })
        return res.status(200).json({ message: 'Deleted Successfully' })
    }
}
