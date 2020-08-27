const BloodCount = require('../models/BloodCount')
const Eritograma = require('../controllers/pseudo-controllers/EritogramaController')
const Leucograma = require('../controllers/pseudo-controllers/LeucogramaController')
const Plaquetario = require('../controllers/pseudo-controllers/PlaquetarioController')

const { hasBloodCount, hasEritograma, hasLeucograma, hasPlaquetario } = require('../utils/hasRegister')
const { createBloodCountId } = require('../utils/createHashes')
const { getBloodCountId, getPatientId } = require('../utils/getIds')

module.exports = {
    async index(req, res) {
        const bloodCount = await BloodCount.findAll({
            include: { all: true },
        }).catch(error => {
            return res.status(400).json({ error })
        })
        return res.status(200).json(bloodCount)
    },
    async indexSpecific(req, res) {
        if(!await hasBloodCount(null, req.params.reqNumber)) return res.status(404).json({error: 'BloodCount not found'})
        const id = await getBloodCountId(req.params.reqNumber)
        const bloodCount = await BloodCount.findByPk(id, {
            include: { all: true }
        }).catch(error => {
            return res.status(400).json({ error })
        })
        return res.status(200).json(bloodCount)
    },
    async store(req, res) {
        const altType = req.params.type
        const type = altType.toLowerCase()
        var control = ''

        //Blood Count
        const {requestNumber, medicalRecord, requester, origin, destiny,
            collectionDate, collectionHour, material, method, automation, releasedAtDate,
            releasedAtHour, rp} = req.body

        //Eritograma
        const {eritrocitos, hemoglobina, hematocrito, VCM, HCM, CHCM, RDW} = req.body

        //Leucograma
        const {leucocitos, celulasBlasticas, promielocito, mielocito, metamielocito,
            bastonete, segmentado, eosinofilo, basofilo, linfocitos, linfocitosAtipicos,
            monocito, plasmocito} = req.body

        //Plaquetario
        const {plaquetas} = req.body

        //Common Datas
        if(await hasBloodCount(null, requestNumber)) return res.status(400).json({error: 'Blood Count is already registered'})
        const bloodCountId = await createBloodCountId()
        
        async function bloodCountStore(res) {
            
            const patientId = await getPatientId(rp)
            if(!patientId) return res.status(404).json({error: 'Patient does not exists'})
            const bloodCountInfo = {
                id: bloodCountId,
                requestNumber,
                medicalRecord,
                requester,
                origin,
                destiny,
                collectionDate,
                collectionHour,
                material,
                method,
                automation,
                releasedAtDate,
                releasedAtHour,
                patientId
            }
            await BloodCount.create(bloodCountInfo).catch(error => {
                return res.status(400).json({error})
            })
            return 'The Blood Count has been registered successfully!'
        }
        
        async function eritogramaStore(res) {
            const eritogramaInfo = {
                eritrocitos,
                hemoglobina,
                hematocrito,
                VCM,
                HCM,
                CHCM,
                RDW
            }
            const eritograma = new Eritograma(bloodCountId, eritogramaInfo)
            const confirm = await eritograma.store()
            if(typeof confirm === 'string') return res.status(400).json({message: confirm})
            if(!confirm) return res.status(400).json({message: 'Some shit happened'})
            return 'The Eritograma has been registered successfully!'
        }
        
        async function leucogramaStore(res) {
            const leucogramaInfo = {
                leucocitos,
                celulasBlasticas,
                promielocito,
                mielocito,
                metamielocito,
                bastonete,
                segmentado,
                eosinofilo,
                basofilo,
                linfocitos,
                linfocitosAtipicos,
                monocito,
                plasmocito
            }
            const leucograma = new Leucograma(bloodCountId, leucogramaInfo)
            const confirm = await leucograma.store()
            if(typeof confirm === 'string') return res.status(400).json({message: confirm})
            if(!confirm) return res.status(400).json({message: 'Some shit happened'})
            return 'The Leucograma has been registered successfully!'
        }

        async function plaquetarioStore(res) {
            const plaquetario = new Plaquetario(bloodCountId, plaquetas)
            const confirm = await plaquetario.store()
            if(typeof confirm === 'string') return res.status(400).json({message: confirm})
            if(!confirm) return res.status(400).json({message: 'Some shit happened'})
            return 'The Plaquetario has been registered successfully!'
        }

        switch (type) {
            case 'complete':
                //Blood Count Store
                await bloodCountStore(res)
                //Eritograma Store
                await eritogramaStore(res)
                //Leucograma Store
                await leucogramaStore(res)
                //Plaquetario Store
                await plaquetarioStore(res)

                return res.status(200).json({message: 'The entire Blood Count has been registered successfully!'})
            case 'bloodCount':
                //Blood Count Store
                control = await bloodCountStore(res)

                return res.status(200).json({message: control})
            case 'eritograma':
                //Blood Count Store
                await bloodCountStore(res)
                //Eritograma Store
                control = await eritogramaStore(res)

                return res.status(200).json({message: control})
            case 'leucograma':
                //Blood Count Store
                await bloodCountStore(res)
                //Leucograma Store
                control = await leucogramaStore(res)

                return res.status(200).json({message: control})
            case 'plaquetario':
                //Blood Count Store
                await bloodCountStore(res)
                //Plaquetario Store
                control = await plaquetarioStore(res)

                return res.status(200).json({message: control})
            default:
                return res.status(400).json({error: 'Invalid Option to Store'})
        }
    },
    async update(req, res) {
        const altType = req.params.type
        const type = altType.toLowerCase()
        const requestNumber = parseInt(req.params.reqNumber)
        var control = ''

        //Blood Count
        const {medicalRecord, requester, origin, destiny,
            collectionDate, collectionHour, material, method, automation, releasedAtDate,
            releasedAtHour, rp} = req.body

        //Eritograma
        const {eritrocitos, hemoglobina, hematocrito, VCM, HCM, CHCM, RDW} = req.body

        //Leucograma
        const {leucocitos, celulasBlasticas, promielocito, mielocito, metamielocito,
            bastonete, segmentado, eosinofilo, basofilo, linfocitos, linfocitosAtipicos,
            monocito, plasmocito} = req.body

        //Plaquetario
        const {plaquetas} = req.body

        //Common Datas
        if(!await hasBloodCount(null, requestNumber)) return res.status(404).json({error: 'Blood Count not found'})
        const bloodCountId = await getBloodCountId(requestNumber)

        async function bloodCountUpdate(res) {
            const patientId = await getPatientId(rp)
            if(!patientId) return res.status(400).json({error: 'Patient does not exists'})
            const bloodCountInfo = {
                id: bloodCountId,
                requestNumber,
                medicalRecord,
                requester,
                origin,
                destiny,
                collectionDate,
                collectionHour,
                material,
                method,
                automation,
                releasedAtDate,
                releasedAtHour,
                patientId
            }
            const bloodCount = await BloodCount.update(bloodCountInfo, {where: {id: bloodCountId}}).catch(error => {
                return res.status(400).json({error})
            })
            return 'The Blood Count has been Updated Successfully!'
        }

        async function eritogramaUpdate(res) {
            const eritogramaInfo = {
                eritrocitos,
                hemoglobina,
                hematocrito,
                VCM,
                HCM,
                CHCM,
                RDW
            }
            const eritograma = new Eritograma(bloodCountId, eritogramaInfo)
            const confirm = await eritograma.update()
            if(typeof confirm === 'string') return res.status(400).json({message: confirm})
            if(!confirm) return res.status(400).json({message: 'Some shit happened'})
            return 'The Eritograma has been Updated Successfully!'
        }

        async function leucogramaUpdate(res) {
            const leucogramaInfo = {
                leucocitos,
                celulasBlasticas,
                promielocito,
                mielocito,
                metamielocito,
                bastonete,
                segmentado,
                eosinofilo,
                basofilo,
                linfocitos,
                linfocitosAtipicos,
                monocito,
                plasmocito
            }
            const leucograma = new Leucograma(bloodCountId, leucogramaInfo)
            const confirm = await leucograma.update()
            if(typeof confirm === 'string') return res.status(400).json({message: confirm})
            if(!confirm) return res.status(400).json({message: 'Some shit happened'})
            return 'The Leucograma has been Updated Successfully!'
        }

        async function plaquetarioUpdate(res) {
            const plaquetario = new Plaquetario(bloodCountId, plaquetas)
            const confirm = await plaquetario.update()
            if(typeof confirm === 'string') return res.status(400).json({message: confirm})
            if(!confirm) return res.status(400).json({message: 'Some shit happened'})
            return 'The Plaquetario has been Updated Successfully!'
        }

        switch (type) {
            case 'complete':
                //Blood Count Update
                await bloodCountUpdate(res)
                //Eritograma Update
                await eritogramaUpdate(res)
                //Leucograma Update
                await leucogramaUpdate(res)
                //Plaquetario Update
                await plaquetarioUpdate(res)

                return res.status(200).json({message: 'The Entire Blood Count has been Updated Successfully!'})

            case 'bloodCount':
                //Blood Count Update
                control = await bloodCountUpdate(res)
                return res.status(200).json({message: control})

            case 'eritograma':
                //Eritograma Update
                control = await eritogramaUpdate(res)
                return res.status(200).json({message: control})
                
            case 'leucograma':
                //Leucograma Update
                control = await leucogramaUpdate(res)
                return res.status(200).json({message: control})
                
            case 'plaquetario':
                //Plaquetario Update
                control = await plaquetarioUpdate(res)
                return res.status(200).json({message: control})
                
            default:
                return res.status(400).json({error: 'Invalid Option to Update'})
        }
    },
    async append(req, res) {
        const altType = req.params.type
        const type = altType.toLowerCase()
        const requestNumber = parseInt(req.params.reqNumber)
        var control = ''

        //Eritograma
        const {eritrocitos, hemoglobina, hematocrito, VCM, HCM, CHCM, RDW} = req.body

        //Leucograma
        const {leucocitos, celulasBlasticas, promielocito, mielocito, metamielocito,
            bastonete, segmentado, eosinofilo, basofilo, linfocitos, linfocitosAtipicos,
            monocito, plasmocito} = req.body

        //Plaquetario
        const {plaquetas} = req.body

        //Common Datas
        if(!await hasBloodCount(null, requestNumber)) return res.status(404).json({error: 'Blood Count not found'})
        const bloodCountId = await getBloodCountId(requestNumber)
        
        async function eritogramaStore(res) {
            const eritogramaInfo = {
                eritrocitos,
                hemoglobina,
                hematocrito,
                VCM,
                HCM,
                CHCM,
                RDW
            }
            const eritograma = new Eritograma(bloodCountId, eritogramaInfo)
            const confirm = await eritograma.store()
            if(typeof confirm === 'string') return res.status(400).json({message: confirm})
            if(!confirm) return res.status(400).json({message: 'Some shit happened'})
            return 'The Eritograma has been registered successfully!'
        }
        
        async function leucogramaStore(res) {
            const leucogramaInfo = {
                leucocitos,
                celulasBlasticas,
                promielocito,
                mielocito,
                metamielocito,
                bastonete,
                segmentado,
                eosinofilo,
                basofilo,
                linfocitos,
                linfocitosAtipicos,
                monocito,
                plasmocito
            }
            const leucograma = new Leucograma(bloodCountId, leucogramaInfo)
            const confirm = await leucograma.store()
            if(typeof confirm === 'string') return res.status(400).json({message: confirm})
            if(!confirm) return res.status(400).json({message: 'Some shit happened'})
            return 'The Leucograma has been registered successfully!'
        }

        async function plaquetarioStore(res) {
            const plaquetario = new Plaquetario(bloodCountId, plaquetas)
            const confirm = await plaquetario.store()
            if(typeof confirm === 'string') return res.status(400).json({message: confirm})
            if(!confirm) return res.status(400).json({message: 'Some shit happened'})
            return 'The Plaquetario has been registered successfully!'
        }

        switch (type) {
            case 'complete':
                //Eritograma Store
                await eritogramaStore(res)
                //Leucograma Store
                await leucogramaStore(res)
                //Plaquetario Store
                await plaquetarioStore(res)

                return res.status(200).json({message: 'The entire Blood Count has been registered successfully!'})
            case 'eritograma':
                //Eritograma Store
                control = await eritogramaStore(res)

                return res.status(200).json({message: control})
            case 'leucograma':
                //Leucograma Store
                control = await leucogramaStore(res)

                return res.status(200).json({message: control})
            case 'plaquetario':
                //Plaquetario Store
                control = await plaquetarioStore(res)

                return res.status(200).json({message: control})
            default:
                return res.status(400).json({error: 'Invalid Option to Store'})
        }
    },
    async delete(req, res) {
        const altType = req.params.type
        const type = altType.toLowerCase()
        const requestNumber = parseInt(req.params.reqNumber)

        if(!await hasBloodCount(null, requestNumber)) return res.status(404).json({error: 'Blood Count not found'})
        const bloodCountId = await getBloodCountId(requestNumber)

        switch (type) {
            case 'complete':
                //Blood Count Delete
                const bloodCount = await BloodCount.destroy({where:{id: bloodCountId}}).catch(error =>{
                    return res.status(400).json({ error })
                })
                return res.status(200).json({ message: 'Blood Count deleted Successfully' })
            case 'eritograma':
                //Eritograma Delete
                if(!await hasEritograma(null, bloodCountId)) return res.status(404).json({error: 'Eritograma not found'})
                
                if(await Eritograma.delete(bloodCountId)) return res.status(200).json({ message: 'Eritograma deleted Successfully' })
                else return res.status(400).json({message: 'Some shit happened'})
            case 'leucograma':
                //Leucograma Delete
                if(!await hasLeucograma(null, bloodCountId)) return res.status(404).json({error: 'Leucograma not found'})
                
                if(await Leucograma.delete(bloodCountId)) return res.status(200).json({ message: 'Leucograma deleted Successfully' })
                else return res.status(400).json({message: 'Some shit happened'})
            case 'plaquetario':
                //Plaquetario Delete
                if(!await hasPlaquetario(null, bloodCountId)) return res.status(404).json({error: 'Plaquetario not found'})
                
                if(await Plaquetario.delete(bloodCountId)) return res.status(200).json({ message: 'Plaquetario deleted Successfully' })
                else return res.status(400).json({message: 'Some shit happened'})
            default:
                return res.status(400).json({error: 'Invalid Option to Delete'})
        }
    }
}
