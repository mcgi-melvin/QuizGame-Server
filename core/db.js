const mysql = require('mysql2/promise')


const query = async ( sql, params = [] ) => {
    try {
        const connection = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            namedPlaceholders: true
        })

        const [rows, fields] = await connection.execute(sql, params)

        connection.end()

        return {
            rows,
            fields
        }
    } catch (e) {
        return e
    }
}

module.exports = {
    query
}