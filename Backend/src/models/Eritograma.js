const { Model, DataTypes } = require('sequelize')

class Eritograma extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.STRING(15),
                primaryKey: true
            },
            eritrocitos: DataTypes.FLOAT,
            hemoglobina: DataTypes.FLOAT,
            hematocrito: DataTypes.FLOAT,
            VCM: DataTypes.FLOAT,
            HCM: DataTypes.FLOAT,
            CHCM: DataTypes.FLOAT,
            RDW: DataTypes.FLOAT
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.belongsTo(models.BloodCount, {foreignKey: 'bloodCountId', as: 'bloodCount'})
    }
}

module.exports = Eritograma
