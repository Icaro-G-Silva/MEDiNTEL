const { Model, DataTypes } = require('sequelize')

class Leucograma extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.STRING(15),
                primaryKey: true
            },
            leucocitos: DataTypes.FLOAT,
            celulasBlasticas: DataTypes.FLOAT,
            promielocito: DataTypes.FLOAT,
            mielocito: DataTypes.FLOAT,
            metamielocito: DataTypes.FLOAT,
            bastonete: DataTypes.FLOAT,
            segmentado: DataTypes.FLOAT,
            eosinofilo: DataTypes.FLOAT,
            basofilo: DataTypes.FLOAT,
            linfocitos: DataTypes.FLOAT,
            linfocitosAtipicos: DataTypes.FLOAT,
            monocito: DataTypes.FLOAT,
            plasmocito: DataTypes.FLOAT
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.belongsTo(models.BloodCount, {foreignKey: 'bloodCountId', as: 'bloodCount'})
    }
}

module.exports = Leucograma
