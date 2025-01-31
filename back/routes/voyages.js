const express = require('express');
const { param, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

router.get(
  '/:voyageId/days/:dayNumber',
  [
    param('voyageId').isInt().withMessage('Voyage ID must be an integer'),
    param('dayNumber').isInt().withMessage('Day number must be an integer')
  ],
  async (req, res) => {
    const { voyageId, dayNumber } = req.params;

    try {
      const query = `
        SELECT d.id, d.day_number, l.id AS location_id, l.name, l.description,
               ST_AsGeoJSON(l.position) AS position, l.arrival, l.departure, l.photos
        FROM days d
        LEFT JOIN locations l ON d.id = l.day_id
        WHERE d.voyage_id = $1 AND d.day_number = $2;
      `;

      const { rows } = await pool.query(query, [voyageId, dayNumber]);

      if (rows.length === 0) {
        return res.status(404).json({ status: 'error', message: 'Day not found' });
      }

      const locations = rows.map(row => ({
        id: row.location_id,
        name: row.name,
        description: row.description,
        position: JSON.parse(row.position),
        arrival: row.arrival,
        departure: row.departure,
        photos: row.photos
      }));

      res.json({ status: 'success', dayNumber: rows[0].day_number, locations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
);

module.exports = router;