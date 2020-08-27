const PlaquetarioModel = require('../../models/Plaquetario')
const {createPlaquetarioId} = require('../../utils/createHashes')
const { hasPlaquetarioIn } = require('../../utils/hasChildIn')
const { PseudoElements } = require('../../utils/errorTexts')
const plateletErrors = new PseudoElements('Plaquetario')

class Plaquetario {
    constructor(bloodCountId = null, plaquetas = null) {
        if(bloodCountId === null || plaquetas === null) throw new Error(plateletErrors.dataObjectNotFit)
        this.id = bloodCountId
        this.plaquetas = plaquetas
    }

    async store() {
        if(await hasPlaquetarioIn(this.id)) return plateletErrors.isAlreadyRegistered
        const id = await createPlaquetarioId()
        const plaquetario = await PlaquetarioModel.create({
            id,
            plaquetas: this.plaquetas,
            bloodCountId: this.id
        }).catch(error => {
            throw new Error(plateletErrors.errorAtController(error))
        })
        return true
    }

    async update() {
        if(!await hasPlaquetarioIn(this.id)) return plateletErrors.anyXRegistered
        const plaquetario = await PlaquetarioModel.update({
            plaquetas: this.plaquetas,
            bloodCountId: this.id
        }, {
            where: {bloodCountId: this.id}
        }).catch(error => {
            throw new Error(plateletErrors.errorAtController(error))
        })
        return true
    }

    static async delete(bloodCountId = null) {
        if(bloodCountId === null) throw new Error(plateletErrors.bloodCountNotFit)
        const plaquetario = await PlaquetarioModel.destroy({where:{bloodCountId}}).catch(error =>{
            throw new Error(plateletErrors.errorAtController(error))
        })
        return true
    }

}

module.exports = Plaquetario