const {Router} = require('express')
const router = Router()
const PatientController = require('./controllers/PatientController')
const DoctorController = require('./controllers/DoctorController')

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

router.get('/', (req, res) => {
    return res.status(200).json({ message: "Connected Successfully" })
})

module.exports = router
