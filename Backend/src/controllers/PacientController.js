const Pacient = require('../models/Pacient')
const { validateDocument } = require('../utils/verifyCPF')
const { hasDoctor, hasPacient } = require('../utils/hasRegister')
const { getDoctorId, getPacientId } = require('../utils/getIds')
const { createPacientId, createHash } = require('../utils/createHashes')

module.exports = {
    async index(req, res) {
        const pacients = await Pacient.findAll({
            include: { association: 'doctor' }
        }).catch(error => {
            return res.status(400).json({ error })
        })
        return res.status(200).json(pacients)
    },
    async indexSpecific(req, res) {
        const id = await getPacientId(parseInt(req.params.rp))
        if(!await hasPacient(id)) return res.status(400).json({error: 'Pacient not found'})

        const pacient = await Pacient.findByPk(id, {
            include: { association: 'doctor' }
        }).catch(error => {
            return res.status(400).json({ error })
        })
        if(pacient) return res.status(200).json(pacient)
        else return res.status(400).json({error: 'Pacient not found'})
    },
    async indexDoctor(req, res) {
        const id = await getPacientId(parseInt(req.params.rp))
        if(!await hasPacient(id)) return res.status(400).json({error: 'Pacient not found'})

        const pacients = await Pacient.findByPk(id, {
            include: { association: 'doctor' }
        }).catch(error => {
            return res.status(400).json({ error })
        })
        if(pacients) return res.status(200).json(pacients.doctor)
        else return res.status(400).json({error: 'Pacient not found'})
    },
    async store(req, res) {
        const { doctorCRM } = req.body
        const { rp, name, surname, idDocument, birth, sex, login, password, accessLevel } = req.body

        const crmSliced = doctorCRM.replace('/', '')
        
        if(await hasPacient(null, rp)) return res.status(400).json({error: 'Pacient is already Registered'})
        if(!validateDocument(idDocument)) return res.status(400).json({error: 'Document invalid'})

        const doctorId = await getDoctorId(crmSliced)
        if(!doctorId) return res.status(400).json({error: "Doctor's crm not found"})
        if(!await hasDoctor(doctorId)) return res.status(400).json({error: 'Doctor not found'})

        const id = await createPacientId()
        const passwordHashed = await createHash(password)
        
        const pacient = await Pacient.create({
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
        return res.status(200).json(pacient)
    },
    async update(req, res) {
        const { rp, name, surname, idDocument, birth, sex, login, password, accessLevel, doctorCRM } = req.body

        const crmSliced = doctorCRM.replace('/', '')

        const id = await getPacientId(parseInt(req.params.rp))
        if(!await hasPacient(id)) return res.status(400).json({error: 'Pacient not found'})
        if(!validateDocument(idDocument)) return res.status(400).json({error: 'Document invalid'})

        const doctorId = await getDoctorId(crmSliced)
        if(!doctorId) return res.status(400).json({error: "Doctor's crm not found"})
        if(!await hasDoctor(doctorId)) return res.status(400).json({error: 'Doctor not found'})

        const passwordHashed = await createHash(password)

        const pacient = await Pacient.update({
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
        const id = await getPacientId(parseInt(req.params.rp))
        if(!await hasPacient(id)) return res.status(400).json({error: 'Pacient not found'})

        const pacient = await Pacient.destroy({where:{id}}).catch(error =>{
            return res.status(400).json({ error })
        })
        return res.status(200).json({ message: 'Deleted Successfully' })
    }
}
