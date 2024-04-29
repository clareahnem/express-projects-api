const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
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
