const Doctor = require('../models/Doctor')
const Patient = require('../models/Patient')
const auth = require('../utils/authentication')
const { validateHash } = require('../utils/createHashes')

module.exports = {
    async login(req, res) {
        const [, hash] = req.headers.authorization.split(' ')
        const [login, password] = Buffer.from(hash, 'base64').toString().split(':')
        try {
            const relatedDoctor = await Doctor.findOne({where: {login}})
            if(relatedDoctor) {
                if(await validateHash(relatedDoctor.get('password'), password)) {
                    const token = auth.sign({id: relatedDoctor.get('id'), accessLevel: relatedDoctor.get('accessLevel')})
                    res.status(200).json(token)
                }
            }
            const relatedPatient = await Patient.findOne({where: {login}})
            if(relatedPatient) {
                if(await validateHash(relatedPatient.get('password'), password)) {
                    const token = auth.sign({id: relatedPatient.get('id'), accessLevel: relatedPatient.get('accessLevel')})
                    res.status(200).json(token)
                }
            }
            res.status(401).json({error: 'Unauthorized. Login or Password incorrect'})
        } catch (error) {
            res.status(400).json({error: `Error -> ${error}`})
        }
    }
}