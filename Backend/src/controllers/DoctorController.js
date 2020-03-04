const Pacient = require('../models/Pacient')
const Doctor = require('../models/Doctor')
const { validateDocument } = require('../utils/verifyCPF')
const { hasDoctor } = require('../utils/hasRegister')

module.exports = {
    async index(req, res) {
        const doctor = await Doctor.findAll({
            include: { association: 'pacients' }
        })
        return res.status(200).json(doctor)
    },
    async indexPacient(req, res) {
        const pacients = await Pacient.findAll({
            where: { doctorId: req.params.id }
        })
        return res.status(200).json(pacients)
    },
    async store(req, res) {
        const { crm, name, surname, idDocument, birth, sex, login, password, accessLevel } = req.body

        const doctorExistence = await hasDoctor(req.params.id)
        if(doctorExistence) return res.status(400).json({error: 'Doctor is already registered'})

        if(!validateDocument(idDocument)) return res.status(400).json({error: 'Document invalid'})

        const doctor = await Doctor.create({
            crm,
            name,
            surname,
            idDocument,
            birth,
            sex,
            login,
            password,
            accessLevel
        }).catch((error)=>{
            return res.status(400).json({ error })
        })
        return res.status(200).json(doctor)
    },
    async update(req, res) {
        const { crm, name, surname, idDocument, birth, sex, login, password, accessLevel } = req.body

        const doctorExistence = await hasDoctor(req.params.id)
        if(!doctorExistence) return res.status(400).json({error: 'Doctor not found'})

        if(!validateDocument(idDocument)) return res.status(400).json({error: 'Document invalid'})

        const doctor = await Doctor.update({
            crm,
            name,
            surname,
            idDocument,
            birth,
            sex,
            login,
            password,
            accessLevel
        }, {
            where: {id: req.params.id}
        }).catch((error)=>{
            return res.status(400).json({ error })
        })
        return res.status(200).json({ message: 'Updated Successfully' })
    },
    async delete(req, res) {

        const doctorExistence = await hasDoctor(req.params.id)
        if(!doctorExistence) return res.status(400).json({error: 'Doctor not found'})

        const doctor = await Doctor.destroy({where:{id: req.params.id}}).catch((error)=>{
            return res.status(400).json({ error })
        })
        return res.status(200).json({ message: 'Deleted Successfully' })
    }
}
