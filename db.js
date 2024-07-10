//db.js
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err.message, err.stack);
});

module.exports = pool;