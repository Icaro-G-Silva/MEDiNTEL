const { Model, DataTypes } = require('sequelize')

class BloodCount extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.STRING(15),
                primaryKey: true
            },
            requestNumber: DataTypes.INTEGER,
            medicalRecord: DataTypes.STRING(80),
            requester: DataTypes.STRING(80),
            origin: DataTypes.STRING(80),
            destiny: DataTypes.STRING(80),
            collectionDate: DataTypes.STRING(11),
            collectionHour: DataTypes.STRING(10),
            material: DataTypes.STRING,
            method: DataTypes.STRING,
            automation: DataTypes.STRING,
            releasedAtDate: DataTypes.STRING(11),
            releasedAtHour: DataTypes.STRING(10)
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.belongsTo(models.Patient, {foreignKey: 'patientId', as: 'patient'})
        this.hasOne(models.Eritograma, {foreignKey: 'bloodCountId', as: 'eritograma'})
        this.hasOne(models.Leucograma, {foreignKey: 'bloodCountId', as: 'leucograma'})
        this.hasOne(models.Plaquetario, {foreignKey: 'bloodCountId', as: 'plaquetario'})
    }
}

module.exports = BloodCount
