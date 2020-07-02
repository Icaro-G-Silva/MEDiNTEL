const { Model, DataTypes } = require('sequelize')

class Patient extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.STRING(15),
                primaryKey: true
            },
            rp: DataTypes.INTEGER,
            name: DataTypes.STRING(80),
            surname: DataTypes.STRING(50),
            idDocument: DataTypes.STRING(15),
            birth: DataTypes.STRING(11),
            sex: DataTypes.STRING(10),
            login: DataTypes.STRING(80),
            password: DataTypes.STRING,
            accessLevel: DataTypes.STRING(20)
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.belongsTo(models.Doctor, {foreignKey: 'doctorId', as: 'doctor'})
        this.hasMany(models.BloodCount, {foreignKey: 'patientId', as: 'bloodCounts'})
    }
}

module.exports = Patient
