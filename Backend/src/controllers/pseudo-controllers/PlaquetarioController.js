const PlaquetarioModel = require('../../models/Plaquetario')
const {createPlaquetarioId} = require('../../utils/createHashes')
const { hasPlaquetarioIn } = require('../../utils/hasChildIn')

class Plaquetario {
    constructor(bloodCountId = null, plaquetas = null) {
        if(bloodCountId === null || plaquetas === null) throw new Error(`ID or Plaquetas is not fitting`)
        this.id = bloodCountId
        this.plaquetas = plaquetas
    }

    async store() {
        if(await hasPlaquetarioIn(this.id)) return `The Plaquetario has been registered before!`
        const id = await createPlaquetarioId()
        const plaquetario = await PlaquetarioModel.create({
            id,
            plaquetas: this.plaquetas,
            bloodCountId: this.id
        }).catch(error => {
            throw new Error(`Error ocurred at 'PlaquetarioController' -> ${error}`)
        })
        return true
    }

    async update() {
        if(!await hasPlaquetarioIn(this.id)) return `Does not has any plaquetario registered!`
        const plaquetario = await PlaquetarioModel.update({
            plaquetas: this.plaquetas,
            bloodCountId: this.id
        }, {
            where: {bloodCountId: this.id}
        }).catch(error => {
            throw new Error(`Error ocurred at 'PlaquetarioController' -> ${error}`)
        })
        return true
    }

    static async delete(bloodCountId = null) {
        if(bloodCountId === null) throw new Error(`Blood Count ID is not fitting`)
        const plaquetario = await PlaquetarioModel.destroy({where:{bloodCountId}}).catch(error =>{
            throw new Error(`Error ocurred at 'PlaquetarioController' -> ${error}`)
        })
        return true
    }

}

module.exports = Plaquetario