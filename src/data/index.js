const mysql = require('mysql')
const { MYSQL_HOST, MYSQL_USER, MYSQL_PW, MYSQL_DB } = require('../../config')

const connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PW,
    database: MYSQL_DB
})

connection.connect((error) => {
    if(!!error) {
        console.log('error connecting to mysql database', error)
    } else {
        console.log('Successfully connected to database!')
    }
})

module.exports = connection
