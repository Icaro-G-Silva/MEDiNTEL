const Pacient = require('../models/Pacient')

module.exports = {
    async index(req, res) {
        const pacients = await Pacient.findAll()
        return res.status(200).json(pacients)
    },
    async store(req, res) {
        const { rp, name, surname, idDocument, birth, sex, login, password, accessLevel } = req.body
        const pacient = await Pacient.create({
            rp,
            name,
            surname,
            idDocument,
            birth,
            sex,
            login,
            password,
            accessLevel
        })
        return res.status(200).json(pacient)
    }
}
