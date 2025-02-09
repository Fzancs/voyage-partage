require('dotenv').config();
const express = require('express');
const voyagesRoutes = require('./routes/voyages');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/voyages', voyagesRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Voyage Partage API!' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});