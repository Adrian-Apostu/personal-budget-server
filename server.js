require('dotenv').config();
const express = require('express');
const cors = require('cors');  // Make sure to require CORS
const path = require('path');
const app = express();

// Use CORS on all routes
app.use(cors());

app.use(express.json());

// Fix the route to require the actual envelopes router
const envelopesRouter = require('./routes/envelopes');
app.use('/api/envelopes', envelopesRouter);

// Correct static file serving
app.use(express.static(path.join(__dirname, '../client/build')));

// Handling all requests to the frontend build index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});