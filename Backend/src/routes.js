const {Router} = require('express')
const router = Router()
const PacientController = require('./controllers/PacientController')
const DoctorController = require('./controllers/DoctorController')

router.post('/pacient', PacientController.store)
router.get('/pacients', PacientController.index)
router.get('/pacient/:rp/doctor', PacientController.indexDoctor)
router.put('/pacient/:rp/update', PacientController.update)
router.delete('/pacient/:rp/delete', PacientController.delete)

router.post('/doctor', DoctorController.store)
router.get('/doctors', DoctorController.index)
router.get('/doctor/:crm/pacients', DoctorController.indexPacient)
router.put('/doctor/:crm/update', DoctorController.update)
router.delete('/doctor/:crm/delete', DoctorController.delete)

router.get('/', (req, res) => {
    return res.status(200).json({ message: "Connected Successfully" })
})

module.exports = router
