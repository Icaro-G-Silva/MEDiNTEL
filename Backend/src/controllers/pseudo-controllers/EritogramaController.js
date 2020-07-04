const EritogramaModel = require('../../models/Eritograma')
const {createEritogramaId} = require('../../utils/createHashes')
const {verifyBloodDatasInputs} = require('../../utils/verifyBloodDatasInputs')
const { hasEritogramaIn } = require('../../utils/hasChildIn')

class Eritograma {
    constructor(bloodCountId = null, datas = {}) {
        if(!verifyBloodDatasInputs(bloodCountId, datas)) throw new Error(`datas' Object is not fitting`)
        this.id = bloodCountId
        this.eritrocitos = datas['eritrocitos']
        this.hemoglobina = datas['hemoglobina']
        this.hematocrito = datas['hematocrito']
        this.VCM = datas['VCM']
        this.HCM = datas['HCM']
        this.CHCM = datas['CHCM']
        this.RDW = datas['RDW']
    }

    async store() {
        if(await hasEritogramaIn(this.id)) return `The Eritogram has been registered before!`
        const id = await createEritogramaId()
        const eritograma = await EritogramaModel.create({
            id,
            eritrocitos: this.eritrocitos,
            hemoglobina: this.hemoglobina,
            hematocrito: this.hematocrito,
            VCM: this.VCM,
            HCM: this.HCM,
            CHCM: this.CHCM,
            RDW: this.RDW,
            bloodCountId: this.id
        }).catch(error => {
            throw new Error(`Error ocurred at 'EritogramaController' -> ${error}`)
        })
        return true
    }

    async update() {
        if(!await hasEritogramaIn(this.id))  return `Does not has any eritograma registered!`
        const eritograma = await EritogramaModel.update({
            eritrocitos: this.eritrocitos,
            hemoglobina: this.hemoglobina,
            hematocrito: this.hematocrito,
            VCM: this.VCM,
            HCM: this.HCM,
            CHCM: this.CHCM,
            RDW: this.RDW,
            bloodCountId: this.id
        }, {
            where: {bloodCountId: this.id}
        }).catch(error => {
            throw new Error(`Error ocurred at 'EritogramaController' -> ${error}`)
        })
        return true
    }

    static async delete(bloodCountId = null) {
        if(bloodCountId === null) throw new Error(`Blood Count ID is not fitting`)
        const eritograma = await EritogramaModel.destroy({where:{bloodCountId}}).catch(error =>{
            throw new Error(`Error ocurred at 'EritogramaController' -> ${error}`)
        })
        return true
    }

}

module.exports = Eritograma