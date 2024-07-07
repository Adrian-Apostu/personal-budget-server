// routes/envelopes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const validateEnvelope = require('../middlewares/validateEnvelope');
const { notFoundError, badRequestError } = require('../middlewares/errorHandler');
let envelopes = [];
//post new envelope
router.post('/', validateEnvelope, async (req, res) => {
    const { name, balance } = req.body;
    try {
        const result = await pool.query('INSERT INTO envelopes (name, balance) VALUES ($1, $2) RETURNING *', [name, balance]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        badRequestError(res, error.message);
    }
});
//get all envelopes
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM envelopes');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
//get envelope by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM envelopes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return notFoundError(res, 'Envelope not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
//update an envelope
router.put('/:id', validateEnvelope, async (req, res) => {
    const { id } = req.params;
    const { name, balance } = req.body;
    try {
        const result = await pool.query(
            'UPDATE envelopes SET name = $1, balance = $2 WHERE id = $3 RETURNING *',
            [name, balance, id]
        );
        if (result.rows.length === 0) {
            return notFoundError(res, 'Envelope not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
//delete an envelope
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const result = await pool.query('DELETE FROM envelopes WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return notFoundError(res, 'Envelope not found');
        }
        res.status(204).send();
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
//transfer
router.post('/transfer', async (req, res) => {
    const { fromId, toId, amount } = req.body;
    try {
        await pool.query('BEGIN');
        await pool.query(
            'UPDATE envelopes SET balance = balance - $1 WHERE id = $2',
            [amount, fromId]
        );
        await pool.query(
            'UPDATE envelopes SET balance = balance + $1 WHERE id = $2',
            [amount, toId]
        );
        await pool.query('COMMIT');
        res.send('Transfer successful');
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Transaction failed: ', error.message);
        badRequestError(res, 'Transfer failed');
    }
});

//fund distribution
router.post('/fund-distribution', async (req, res) => {
    const { totalAmount, envelopeIds } = req.body;

    if (!Array.isArray(envelopeIds) || isNaN(totalAmount) || totalAmount <= 0) {
        return badRequestError(res, 'Invalid distribution data');
    }

    let client = null;  

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const distributionAmount = totalAmount / envelopeIds.length;

        for (let envelopeId of envelopeIds) {
            await client.query(
                'UPDATE envelopes SET balance = balance + $1 WHERE id = $2',
                [distributionAmount, envelopeId]
            );
        }

        await client.query('COMMIT');
        res.send('Funds distributed successfully');
    } catch (error) {
        await client?.query('ROLLBACK');  
        console.error('Fund distribution failed:', error.message);
        badRequestError(res, 'Fund distribution failed');
    } finally {
        if (client) {
            client.release();
        }
    }
});

module.exports = router;