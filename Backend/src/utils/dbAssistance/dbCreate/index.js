const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const {doctorTable, pacientTable} = require('../../../configs/externalDatabase');
const configPath = path.resolve(__dirname, '../', '../', '../', 'configs', 'database.js');

module.exports ={
    async dbCreate(host, username, password, database) {
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
        }`;

        await fs.writeFile(configPath, content, (err)=>{
            if(err) return console.log(`Error: ${err.message}`);
            else return console.log(`File was been written`);
        });

        const connection = await mysql.createConnection({
            host,
            user: username,
            password,
            database
        });

        await connection.query(`${doctorTable}`);
        await connection.query(`${pacientTable}`);

        connection.close();
    }
}
