const {Router} = require('express')
const router = Router()
const PacientController = require('./controllers/PacientController')
const DoctorController = require('./controllers/DoctorController')

router.post('/pacient', PacientController.store)
router.get('/pacients', PacientController.index)
router.get('/pacient/:id/doctor', PacientController.indexDoctor)
router.put('/pacient/:id/update', PacientController.update)
router.delete('/pacient/:id/delete', PacientController.delete)

router.post('/doctor', DoctorController.store)
router.get('/doctors', DoctorController.index)
router.get('/doctor/:id/pacients', DoctorController.indexPacient)
router.put('/doctor/:id/update', DoctorController.update)
router.delete('/doctor/:id/delete', DoctorController.delete)

router.get('/', (req, res) => {
    return res.status(200).json({ message: "Connected Successfully" })
})

module.exports = router
