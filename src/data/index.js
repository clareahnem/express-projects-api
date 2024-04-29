const mysql = require('mysql')
const { MYSQL_HOST, MYSQL_USER, MYSQL_PW } = require('../../config')

const connection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PW,
    database: 'projects'
})

connection.connect((error) => {
    if(!!error) {
        console.log('error connecting to mysql database', error)
    } else {
        console.log('Successfilly connected to database!')
    }
})

module.exports = connection
