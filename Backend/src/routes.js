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
router.get('/patient/:rp/bloodcounts', PatientController.indexSpecificBloodCount)

router.post('/doctor', DoctorController.store)
router.get('/doctors', DoctorController.index)
router.get('/doctor/:crm', DoctorController.indexSpecific)
router.get('/doctor/:crm/patients', DoctorController.indexPatient)
router.put('/doctor/:crm/update', DoctorController.update)
router.delete('/doctor/:crm/delete', DoctorController.delete)
router.get('/doctor/:crm/bloodcounts', DoctorController.indexBloodCounts)

router.post('/bloodCount/:type', BloodCountController.store)
router.post('/bloodCount/:reqNumber/:type', BloodCountController.append)
router.get('/bloodCounts', BloodCountController.index)
router.get('/bloodCount/:reqNumber', BloodCountController.indexSpecific)
router.get('/bloodCount/:reqNumber/:type/analyze', BloodCountController.analyze)
router.put('/bloodCount/:reqNumber/:type', BloodCountController.update)
router.delete('/bloodCount/:reqNumber/:type', BloodCountController.delete)

router.get('/login', AuthController.login)
router.get('/token/:token/verify', AuthController.verifyToken)

router.get('/', (req, res) => {
    return res.status(200).json({ message: "Connected Successfully" })
})

module.exports = router
