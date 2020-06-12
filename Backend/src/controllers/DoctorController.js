const Pacient = require('../models/Pacient')
const Doctor = require('../models/Doctor')
const { validateDocument } = require('../utils/verifyCPF')
const { hasDoctor } = require('../utils/hasRegister')
const {createDoctorId, createHash} = require('../utils/createHashes')
const { getDoctorId } = require('../utils/getIds')

module.exports = {
    async index(req, res) {
        const doctor = await Doctor.findAll({
            include: { association: 'pacients' }
        })
        return res.status(200).json(doctor)
    },
    async indexPacient(req, res) {
        const id = await getDoctorId(req.params.crm)
        const pacients = await Pacient.findAll({
            where: { doctorId: id }
        })
        return res.status(200).json(pacients)
    },
    async store(req, res) {
        const { crm, name, surname, idDocument, birth, sex, login, password, accessLevel } = req.body

        const crmSliced = crm.replace('/', '')

        const doctorExistence = await hasDoctor(null, crmSliced)
        if(doctorExistence) return res.status(400).json({error: 'Doctor is already registered'})

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
        }).catch((error)=>{
            return res.status(400).json({ error })
        })
        return res.status(200).json(doctor)
    },
    async update(req, res) {
        const { crm, name, surname, idDocument, birth, sex, login, password, accessLevel } = req.body

        const crmSliced = crm.replace('/', '')

        const id = await getDoctorId(req.params.crm)
        const doctorExistence = await hasDoctor(id)
        if(!doctorExistence) return res.status(400).json({error: 'Doctor not found'})

        if(!validateDocument(idDocument)) return res.status(400).json({error: 'Document invalid'})

        if(req.params.crm != crmSliced) {
            const doctorExistence = await hasDoctor(null, crmSliced)
            if(doctorExistence) return res.status(400).json({error: 'Doctor is already registered'})
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
        }).catch((error)=>{
            return res.status(400).json({ error })
        })
        return res.status(200).json({ message: 'Updated Successfully' })
    },
    async delete(req, res) {
        const id = await getDoctorId(req.params.crm)
        const doctorExistence = await hasDoctor(id)
        if(!doctorExistence) return res.status(400).json({error: 'Doctor not found'})

        const doctor = await Doctor.destroy({where:{id}}).catch((error)=>{
            return res.status(400).json({ error })
        })
        return res.status(200).json({ message: 'Deleted Successfully' })
    }
}
