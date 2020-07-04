const LeucogramaModel = require('../../models/Leucograma')
const {createLeucogramaId} = require('../../utils/createHashes')
const {verifyBloodDatasInputs} = require('../../utils/verifyBloodDatasInputs')
const { hasLeucogramaIn } = require('../../utils/hasChildIn')

class Leucograma {
    constructor(bloodCountId = null, datas = {}) {
        if(!verifyBloodDatasInputs(bloodCountId, datas)) throw new Error(`datas' Object is not fitting`)
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

    async store() {
        if(await hasLeucogramaIn(this.id)) return `The Leucograma has been registered before!`
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
            throw new Error(`Error ocurred at 'LeucogramaController' -> ${error}`)
        })
        return true
    }

    async update() {
        if(!await hasLeucogramaIn(this.id)) return `Does not has any leucograma registered!`
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
            throw new Error(`Error ocurred at 'LeucogramaController' -> ${error}`)
        })
        return true
    }

    static async delete(bloodCountId = null) {
        if(bloodCountId === null) throw new Error(`Blood Count ID is not fitting`)
        const leucograma = await LeucogramaModel.destroy({where:{bloodCountId}}).catch(error =>{
            throw new Error(`Error ocurred at 'LeucogramaController' -> ${error}`)
        })
        return true
    }

}

module.exports = Leucograma