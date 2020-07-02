const { Model, DataTypes } = require('sequelize')

class Plaquetario extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.STRING(15),
                primaryKey: true
            },
            plaquetas: DataTypes.INTEGER
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.belongsTo(models.BloodCount, {foreignKey: 'bloodCountId', as: 'bloodCount'})
    }
}

module.exports = Plaquetario
