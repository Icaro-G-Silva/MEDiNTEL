const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const { validateDocument } = require('../utils/verifyCPF')
const { hasDoctor } = require('../utils/hasRegister')
const {createDoctorId, createHash} = require('../utils/createHashes')
const { getDoctorId } = require('../utils/getIds')

module.exports = {
    async index(req, res) {
        const doctor = await Doctor.findAll({
            include: { association: 'patients' }
        }).catch(error => {
            return res.status(400).json({ error })
        })
        return res.status(200).json(doctor)
    },
    async indexSpecific(req, res) {
        if(! await hasDoctor(null, req.params.crm)) return res.status(400).json({"Error": "Doctor not found"})
        const id = await getDoctorId(req.params.crm)
        const doctor = await Doctor.findByPk(id, {
            include: { association: 'patients' }
        }).catch(error => {
            return res.status(400).json({ error })
        })
        return res.status(200).json(doctor)
    },
    async indexPatient(req, res) {
        if(! await hasDoctor(null, req.params.crm)) return res.status(400).json({"Error": "Doctor not found"})
        const id = await getDoctorId(req.params.crm)
        const patients = await Patient.findAll({
            where: { doctorId: id }
        }).catch(error => {
            return res.status(400).json({ error })
        })
        return res.status(200).json(patients)
    },
    async store(req, res) {
        const { crm, name, surname, idDocument, birth, sex, login, password, accessLevel } = req.body

        const crmSliced = crm.replace('/', '')

        if(await hasDoctor(null, crmSliced)) return res.status(400).json({error: 'Doctor is already registered'})
        if(!validateDocument(idDocument)) return res.status(400).json({error: 'Document invalid'})

        const id = await createDoctorId()
        const passwordHashed = await createHash(password)

        const doctor = await Doctor.create({
            id,
            crm: crmSliced,
            name,
            surname,
            idDocument,
            birth,
            sex,
            login,
            password: passwordHashed,
            accessLevel
        }).catch(error =>{
            return res.status(400).json({ error })
        })
        return res.status(200).json(doctor)
    },
    async update(req, res) {
        const { crm, name, surname, idDocument, birth, sex, login, password, accessLevel } = req.body

        const crmSliced = crm.replace('/', '')

        if(!await hasDoctor(null, req.params.crm)) return res.status(400).json({error: 'Doctor not found'})
        const id = await getDoctorId(req.params.crm)

        if(!validateDocument(idDocument)) return res.status(400).json({error: 'Document invalid'})

        if(req.params.crm != crmSliced) {
            if(await hasDoctor(null, crmSliced)) return res.status(400).json({error: 'Doctor is already registered'})
        }

        const passwordHashed = await createHash(password)

        const doctor = await Doctor.update({
            crm: crmSliced,
            name,
            surname,
            idDocument,
            birth,
            sex,
            login,
            password: passwordHashed,
            accessLevel
        }, {
            where: {id}
        }).catch(error =>{
            return res.status(400).json({ error })
        })
        return res.status(200).json({ message: 'Updated Successfully' })
    },
    async delete(req, res) {
        if(!await hasDoctor(null, req.params.crm)) return res.status(400).json({error: 'Doctor not found'})
        const id = await getDoctorId(req.params.crm)

        const doctor = await Doctor.destroy({where:{id}}).catch(error =>{
            return res.status(400).json({ error })
        })
        return res.status(200).json({ message: 'Deleted Successfully' })
    }
}
