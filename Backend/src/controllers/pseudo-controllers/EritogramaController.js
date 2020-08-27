const EritogramaModel = require('../../models/Eritograma')
const {createEritogramaId} = require('../../utils/createHashes')
const {verifyBloodDatasInputs} = require('../../utils/verifyBloodDatasInputs')
const { hasEritogramaIn } = require('../../utils/hasChildIn')
const { PseudoElements } = require('../../utils/errorTexts')
const eritogramErrors = new PseudoElements('Eritograma')

class Eritograma {
    constructor(bloodCountId = null, datas = {}) {
        if(!verifyBloodDatasInputs(bloodCountId, datas)) throw new Error(eritogramErrors.dataObjectNotFit)
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
        if(await hasEritogramaIn(this.id)) return eritogramErrors.isAlreadyRegistered
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
            throw new Error(eritogramErrors.errorAtController(error))
        })
        return true
    }

    async update() {
        if(!await hasEritogramaIn(this.id))  return eritogramErrors.anyXRegistered
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
            throw new Error(eritogramErrors.errorAtController(error))
        })
        return true
    }

    static async delete(bloodCountId = null) {
        if(bloodCountId === null) throw new Error(eritogramErrors.bloodCountNotFit)
        const eritograma = await EritogramaModel.destroy({where:{bloodCountId}}).catch(error =>{
            throw new Error(eritogramErrors.errorAtController(error))
        })
        return true
    }

}

module.exports = Eritograma