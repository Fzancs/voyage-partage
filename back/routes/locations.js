const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('position').notEmpty().withMessage('Position is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }

    const { dayId, name, description, position, arrival, departure, photos } = req.body;

    try {
      const query = `
        INSERT INTO locations (day_id, name, description, position, arrival, departure, photos)
        VALUES ($1, $2, $3, ST_SetSRID(ST_Point($4, $5), 4326), $6, $7, $8) RETURNING *;
      `;

      const values = [dayId, name, description, position.coordinates[0], position.coordinates[1], arrival, departure, photos];
      const { rows } = await pool.query(query, values);

      res.json({ status: 'success', message: 'Location added successfully', data: rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
);

module.exports = router;