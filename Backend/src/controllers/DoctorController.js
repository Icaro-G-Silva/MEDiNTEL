const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')

const { validateDocument } = require('../utils/verifyCPF')
const { verifyCRM } = require('../utils/verifyCRM')
const { hasDoctor, hasPatient } = require('../utils/hasRegister')
const {createDoctorId, createHash} = require('../utils/createHashes')
const { getDoctorId } = require('../utils/getIds')

const auth = require('../utils/authentication')

const { DoctorErrors } = require('../utils/errorTexts')
const doctorErrors = new DoctorErrors()

module.exports = {

    /**
     * Select all the doctors registers
     * 
     * @function index
     * @param {any} req Express/Router/Request
     * @param {any} res Express/Router/Response
     * @returns {any} JSON - Response
    */
    async index(req, res) {
        const doctor = await Doctor.findAll({
            include: { association: 'patients' }
        }).catch(error => {
            return res.status(400).json({ error: doctorErrors.errorAtController(error) })
        })
        return res.status(200).json(doctor)
    },

    /**
     * Select a specific doctor
     * 
     * @function indexSpecific
     * @param {any} req Express/Router/Request
     * @param {any} res Express/Router/Response
     * @returns {any} JSON - Response
    */
    async indexSpecific(req, res) {
        if(! await hasDoctor(null, req.params.crm)) return res.status(404).json({error: doctorErrors.notFound})
        const id = await getDoctorId(req.params.crm)
        const doctor = await Doctor.findByPk(id, {
            include: { association: 'patients' }
        }).catch(error => {
            return res.status(400).json({ error: doctorErrors.errorAtController(error) })
        })
        return res.status(200).json(doctor)
    },

    /**
     * Select all the patients linked with the related doctor
     * 
     * @function indexPatient
     * @param {any} req Express/Router/Request
     * @param {any} res Express/Router/Response
     * @returns {any} JSON - Response
    */
    async indexPatient(req, res) {
        if(! await hasDoctor(null, req.params.crm)) return res.status(404).json({error: doctorErrors.notFound})
        const id = await getDoctorId(req.params.crm)
        const patients = await Patient.findAll({
            where: { doctorId: id }
        }).catch(error => {
            return res.status(400).json({ error: doctorErrors.errorAtController(error) })
        })
        return res.status(200).json(patients)
    },

    /**
     * Stores a doctor
     * 
     * @function store
     * @param {any} req Express/Router/Request
     * @param {any} res Express/Router/Response
     * @returns {any} JSON - Response
    */
    async store(req, res) {
        const { crm, name, surname, idDocument, birth, sex, login, password, accessLevel } = req.body

        if(!await verifyCRM(crm) || crm === null) res.status(400).json({error: doctorErrors.invalidCRM})
        
        const crmSliced = crm.replace('/', '')
        if(await hasDoctor(null, crmSliced)) return res.status(400).json({error: doctorErrors.isAlreadyRegistered})
        if(!validateDocument(idDocument)) return res.status(400).json({error: doctorErrors.invalidDocument})
        if(await hasDoctor(null, null, login) || await hasPatient(null, null, login)) return res.status(400).json({error: doctorErrors.login.isAlreadyRegistered})

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
            return res.status(400).json({ error: doctorErrors.errorAtController(error) })
        })
        const token = auth.sign({id, accessLevel, crm})
        return res.status(200).json({doctor, token})
    },

    /**
     * Update a specific doctor
     * 
     * @function update
     * @param {any} req Express/Router/Request
     * @param {any} res Express/Router/Response
     * @returns {any} JSON - Response
    */
    async update(req, res) {
        const { crm, name, surname, idDocument, birth, sex, accessLevel } = req.body

        if(!await verifyCRM(crm) || crm === null) res.status(400).json({error: doctorErrors.invalidCRM})

        const crmSliced = crm.replace('/', '')
        if(!await hasDoctor(null, req.params.crm)) return res.status(404).json({error: doctorErrors.notFound})
        const id = await getDoctorId(req.params.crm)

        if(!validateDocument(idDocument)) return res.status(400).json({error: doctorErrors.invalidDocument})

        if(req.params.crm !== crmSliced) {
            if(await hasDoctor(null, crmSliced)) return res.status(400).json({error: doctorErrors.isAlreadyRegistered})
        }

        const doctor = await Doctor.update({
            crm: crmSliced,
            name,
            surname,
            idDocument,
            birth,
            sex,
            accessLevel
        }, {
            where: {id}
        }).catch(error =>{
            return res.status(400).json({ error: doctorErrors.errorAtController(error) })
        })
        const token = auth.sign({id, accessLevel, crm})
        return res.status(200).json({ message: 'Updated Successfully', token })
    },

    /**
     * Delete a specific doctor
     * 
     * @function index
     * @param {any} req Express/Router/Request
     * @param {any} res Express/Router/Response
     * @returns {any} JSON - Response
    */
    async delete(req, res) {
        if(!await hasDoctor(null, req.params.crm)) return res.status(404).json({error: doctorErrors.notFound})
        const id = await getDoctorId(req.params.crm)

        const doctor = await Doctor.destroy({where:{id}}).catch(error =>{
            return res.status(400).json({ error: doctorErrors.errorAtController(error) })
        })
        return res.status(200).json({ message: 'Deleted Successfully' })
    },

    /**
     * Select all the blood counts related to the doctor's patients
     * 
     * @function indexBloodCounts
     * @param {any} req Express/Router/Request
     * @param {any} res Express/Router/Response
     * @returns {any} JSON - Response
    */
    async indexBloodCounts(req, res) {
        if(! await hasDoctor(null, req.params.crm)) return res.status(404).json({error: doctorErrors.notFound})
        const id = await getDoctorId(req.params.crm)
        const patients = await Patient.findAll({
            where: { doctorId: id }, include: { all: true }
        }).catch(error => {
            return res.status(400).json({ error: doctorErrors.errorAtController(error) })
        })
        return res.status(200).json(patients)
    }
}
