require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = ['https://personal-budget-tracker-app.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

const envelopesRouter = require('./routes/envelopes');
app.use('/api/envelopes', envelopesRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});