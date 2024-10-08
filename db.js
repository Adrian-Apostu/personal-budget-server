const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.SCHEMATOGO_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err.message, err.stack);
});

module.exports = pool;