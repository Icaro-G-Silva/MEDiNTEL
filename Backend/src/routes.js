const {Router} = require('express')
const router = Router()
const PatientController = require('./controllers/PatientController')
const DoctorController = require('./controllers/DoctorController')
const BloodCountController = require('./controllers/BloodCountController')
const AuthController = require('./controllers/AuthController')

router.post('/patient', PatientController.store)
router.get('/patients', PatientController.index)
router.get('/patient/:rp', PatientController.indexSpecific)
router.get('/patient/:rp/doctor', PatientController.indexDoctor)
router.put('/patient/:rp/update', PatientController.update)
router.delete('/patient/:rp/delete', PatientController.delete)

router.post('/doctor', DoctorController.store)
router.get('/doctors', DoctorController.index)
router.get('/doctor/:crm', DoctorController.indexSpecific)
router.get('/doctor/:crm/patients', DoctorController.indexPatient)
router.put('/doctor/:crm/update', DoctorController.update)
router.delete('/doctor/:crm/delete', DoctorController.delete)

router.post('/bloodCount/:type', BloodCountController.store)
router.post('/bloodCount/:reqNumber/:type', BloodCountController.append)
router.get('/bloodCounts', BloodCountController.index)
router.get('/bloodCount/:reqNumber', BloodCountController.indexSpecific)
router.put('/bloodCount/:reqNumber/:type', BloodCountController.update)
router.delete('/bloodCount/:reqNumber/:type', BloodCountController.delete)

router.get('/login', AuthController.login)

router.get('/', (req, res) => {
    return res.status(200).json({ message: "Connected Successfully" })
})

module.exports = router
