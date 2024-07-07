// middlewares/errorHandler.js
const notFoundError = (res, message = 'Not found') => res.status(404).json({ message });

const badRequestError = (res, message = 'Bad request') => res.status(400).json({ message });

module.exports = { notFoundError, badRequestError };