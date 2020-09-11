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
            promielocito: DataTypes.STRING,
            mielocito: DataTypes.STRING,
            metamielocito: DataTypes.STRING,
            bastonete: DataTypes.STRING,
            segmentado: DataTypes.STRING,
            eosinofilo: DataTypes.STRING,
            basofilo: DataTypes.STRING,
            linfocitos: DataTypes.STRING,
            linfocitosAtipicos: DataTypes.STRING,
            monocito: DataTypes.STRING,
            plasmocito: DataTypes.STRING
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.belongsTo(models.BloodCount, {foreignKey: 'bloodCountId', as: 'bloodCount'})
    }
}

module.exports = Leucograma
