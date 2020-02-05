const Pacient = require('../models/Pacient')
const Doctor = require('../models/Doctor')
const { validateDocument } = require('../utils/verifyCPF')
const { hasDoctor, hasPacient } = require('../utils/hasRegister')

module.exports = {
    async index(req, res) {
        const pacients = await Pacient.findAll({
            include: { association: 'doctor' }
        })
        return res.status(200).json(pacients)
    },
    async indexDoctor(req, res) {
        const pacients = await Pacient.findByPk(req.params.id, {
            include: { association: 'doctor' }
        })
        if(pacients) return res.status(200).json(pacients.doctor)
        else return res.status(400).json({error: 'Pacient not found'})
    },
    async store(req, res) {
        const { id } = req.body //Talvez mude!!!
        const { rp, name, surname, idDocument, birth, sex, login, password, accessLevel } = req.body

        if(!validateDocument(idDocument)) return res.status(400).json({error: 'Document invalid'})

        if(!hasDoctor(id)) return res.status(400).json({error: 'Doctor not found'})

        const pacient = await Pacient.create({
            rp,
            name,
            surname,
            idDocument,
            birth,
            sex,
            login,
            password,
            accessLevel,
            doctorId: id
        }).catch((error)=>{
            return res.status(400).json({ error })
        })
        return res.status(200).json(pacient)
    },
    async update(req, res) {
        const { rp, name, surname, idDocument, birth, sex, login, password, accessLevel, id } = req.body

        if(!hasPacient(req.params.id)) return res.status(400).json({error: 'Pacient not found'})
        if(!validateDocument(idDocument)) return res.status(400).json({error: 'Document invalid'})

        const relatedDoctor = await Doctor.findAll({ where: { id } })
        if(!relatedDoctor) return res.status(400).json({error: 'Doctor not found'})

        const pacient = await Pacient.update({
            rp,
            name,
            surname,
            idDocument,
            birth,
            sex,
            login,
            password,
            accessLevel,
            doctorId: id
        }, {
            where: {id: req.params.id}
        }).catch((error)=>{
            return res.status(400).json({ error })
        })
        return res.status(200).json({ message: 'Updated Successfully' })
    },
    async delete(req, res) {
        if(!hasPacient(req.params.id)) return res.status(400).json({error: 'Pacient not found'})

        const pacient = await Pacient.destroy({where:{id: req.params.id}}).catch((error)=>{
            return res.status(400).json({ error })
        })
        return res.status(200).json({ message: 'Deleted Successfully' })
    }
}
