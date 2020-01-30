const {Router} = require('express')
const router = Router()
const PacientController = require('./controllers/PacientController')

router.post('/pacient', PacientController.store)
router.get('/pacient', PacientController.index)

router.get('/', (req, res) => {
    return res.status(200).json({ message: "Connected Successfully" })
})

module.exports = router
