const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PW: process.env.MYSQL_PW,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_DB: process.env.MYSQL_DB
}