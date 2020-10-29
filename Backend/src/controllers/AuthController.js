const Doctor = require('../models/Doctor')
const Patient = require('../models/Patient')

const auth = require('../utils/authentication')

const { validateHash } = require('../utils/createHashes')

const { AuthErrors } = require('../utils/errorTexts')
const authErrors = new AuthErrors()

module.exports = {

    /**
     * Do the Login
     * 
     * @function login
     * @param {any} req Express/Router/Request
     * @param {any} res Express/Router/Response
     * @returns {any} JSON - Response (Token)
    */
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
            res.status(401).json({error: authErrors.unauthorized('Login or Password incorrect')})
        } catch (error) {
            res.status(400).json({error: authErrors.errorAtController(error)})
        }
    },

    /**
     * Do the Login via Post
     * 
     * @function loginPost
     * @param {any} req Express/Router/Request
     * @param {any} res Express/Router/Response
     * @returns {any} JSON - Response (Token)
    */
   async loginPost(req, res) {
        const {login, password} = req.body
        try {
            const relatedDoctor = await Doctor.findOne({where: {login}})
            if(relatedDoctor) {
                if(await validateHash(relatedDoctor.get('password'), password)) {
                    const token = auth.sign({id: relatedDoctor.get('id'), accessLevel: relatedDoctor.get('accessLevel'), crm: relatedDoctor.get('crm')})
                    res.status(200).json(token)
                }
            }
            const relatedPatient = await Patient.findOne({where: {login}})
            if(relatedPatient) {
                if(await validateHash(relatedPatient.get('password'), password)) {
                    const token = auth.sign({id: relatedPatient.get('id'), accessLevel: relatedPatient.get('accessLevel'), rp: relatedPatient.get('rp')})
                    res.status(200).json(token)
                }
            }
            res.status(401).json({error: authErrors.unauthorized('Login or Password incorrect')})
        } catch (error) {
            res.status(400).json({error: authErrors.errorAtController(error)})
        }
    },



    /**
     * Verify a token
     * 
     * @function verifyToken
     * @param {any} req Express/Router/Request
     * @param {any} res Express/Router/Response
     * @returns {any} JSON - Response
    */
    async verifyToken(req, res) {
        const token = req.params.token
        try {
            res.status(200).json(auth.verify(token))
        } catch (error) {
            if(error.message === 'invalid signature') res.status(401).json({error: authErrors.unauthorized(error.message)})
            else res.status(400).json({error: authErrors.errorAtController(error)})
        }
    }
}