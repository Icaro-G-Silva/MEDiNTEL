const LeucogramaModel = require('../../models/Leucograma')

const {createLeucogramaId} = require('../../utils/createHashes')
const {verifyBloodDatasInputs} = require('../../utils/verifyBloodDatasInputs')
const { hasLeucogramaIn } = require('../../utils/hasChildIn')

const { PseudoElements } = require('../../utils/errorTexts')
const leucogramErrors = new PseudoElements('Leucograma')

class Leucograma {

    /**
     * Constructor from 'Leucograma'
     * 
     * @function constructor
     * @param {String} bloodCountId The ID
     * @param {Object} datas The object data to leucograma
    */
    constructor(bloodCountId = null, datas = {}) {
        if(!verifyBloodDatasInputs(bloodCountId, datas)) throw new Error(leucogramErrors.dataObjectNotFit)
        this.id = bloodCountId
        this.leucocitos = datas['leucocitos']
        this.celulasBlasticas = datas['celulasBlasticas']
        this.promielocito = datas['promielocito']
        this.mielocito = datas['mielocito']
        this.metamielocito = datas['metamielocito']
        this.bastonete = datas['bastonete']
        this.segmentado = datas['segmentado']
        this.eosinofilo = datas['eosinofilo']
        this.basofilo = datas['basofilo']
        this.linfocitos = datas['linfocitos']
        this.linfocitosAtipicos = datas['linfocitosAtipicos']
        this.monocito = datas['monocito']
        this.plasmocito = datas['plasmocito']
    }

    /**
     * Stores a Leucograma
     * 
     * @function store
     * @returns {Boolean} True if alright
    */
    async store() {
        if(await hasLeucogramaIn(this.id)) return leucogramErrors.isAlreadyRegistered
        const id = await createLeucogramaId()
        const leucograma = await LeucogramaModel.create({
            id,
            leucocitos: this.leucocitos,
            celulasBlasticas: this.celulasBlasticas,
            promielocito: this.promielocito,
            mielocito: this.mielocito,
            metamielocito: this.metamielocito,
            bastonete: this.bastonete,
            segmentado: this.segmentado,
            eosinofilo: this.eosinofilo,
            basofilo: this.basofilo,
            linfocitos: this.linfocitos,
            linfocitosAtipicos: this.linfocitosAtipicos,
            monocito: this.monocito,
            plasmocito: this.plasmocito,
            bloodCountId: this.id
        }).catch(error => {
            throw new Error(leucogramErrors.errorAtController(error))
        })
        return true
    }

    /**
     * Updates a specific Leucograma
     * 
     * @function update
     * @returns {Boolean} True if alright
    */
    async update() {
        if(!await hasLeucogramaIn(this.id)) return leucogramErrors.anyXRegistered
        const leucograma = await LeucogramaModel.update({
            leucocitos: this.leucocitos,
            celulasBlasticas: this.celulasBlasticas,
            promielocito: this.promielocito,
            mielocito: this.mielocito,
            metamielocito: this.metamielocito,
            bastonete: this.bastonete,
            segmentado: this.segmentado,
            eosinofilo: this.eosinofilo,
            basofilo: this.basofilo,
            linfocitos: this.linfocitos,
            linfocitosAtipicos: this.linfocitosAtipicos,
            monocito: this.monocito,
            plasmocito: this.plasmocito,
            bloodCountId: this.id
        }, {
            where: {bloodCountId: this.id}
        }).catch(error => {
            throw new Error(leucogramErrors.errorAtController(error))
        })
        return true
    }

    /**
     * Delete a specific Leucograma
     * 
     * @function delete
     * @returns {Boolean} True if alright
    */
    static async delete(bloodCountId = null) {
        if(bloodCountId === null) throw new Error(leucogramErrors.bloodCountNotFit)
        const leucograma = await LeucogramaModel.destroy({where:{bloodCountId}}).catch(error =>{
            throw new Error(leucogramErrors.errorAtController(error))
        })
        return true
    }

}

module.exports = Leucograma
