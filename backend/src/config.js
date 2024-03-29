require('dotenv').config()

const FRONTEND_URL  = process.env.FRONTEND_URL || 'http://localhost:5173'
const DB_USER       = process.env.DB_USER || 'postgres'
const DB_PASSWORD   = process.env.DB_PASSWORD || 'postgres'
const HOST          = process.env.HOST || 'localhost'
const PORT          = process.env.PORT || 5432 
const DB_NAME       = process.env.DB_NAME || 'pet_palace'

module.exports = {
    FRONTEND_URL,
    DB_USER,
    DB_PASSWORD,
    HOST,
    PORT,
    DB_NAME
}