const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const shell = require('child_process').exec
const {doctorTable, patientTable} = require('../../../configs/externalDatabase');
const configPath = path.resolve(__dirname, '../', '../', '../', 'configs', 'database.js');

//Schema needs to exist!                ||
//                                      \/
dbCreate('localhost', 'root', 'root', 'medintel')

async function dbCreate(host, username, password, database) {
    const content = `module.exports = {
        dialect: 'mysql',
        host: '${host}',
        username: '${username}',
        password: '${password}',
        database: '${database}',
        define: {
            timestamps: true,
            underscored: false
        }
    }`

    try {
        await fs.writeFile(configPath, content, (err)=>{
            if(err) return console.log(`Error: ${err.message}`)
            else return console.log(`File 'database.js' has been subscribed`)
        })

        await shell('npx sequelize db:migrate && echo All done!', (error, stdout)=>{
            if(error) console.error(error)
            console.log(stdout)
        })
    } catch (error) {
        console.error(`Error occured at dbCreate -> ${error}`)
    }
}
