//middlewares/validateEnvelope.js
const validateEnvelope = (req, res, next) => {
    const { name, balance } = req.body;
    if (!name || balance === undefined || typeof balance !== 'number' || balance < 0) {
        return res.status(400).json({ message: 'Please provide a valid name and a non-negative balance for the envelope' });
    }
    next();
};

module.exports = validateEnvelope;