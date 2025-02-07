const express = require('express');
const { param } = require('express-validator');
const pool = require('../db');

const router = express.Router();

router.get(
  '/:voyageId/days/:day',
  [
    param('voyageId').isInt().withMessage('Voyage ID must be an integer'),
    param('day').isInt().withMessage('Day number must be an integer')
  ],
  async (req, res) => {
    const { voyageId, day } = req.params;

    try {
      const locationsQuery = `
        SELECT l.id AS location_id, l.name, l.description,
               ST_AsGeoJSON(l.position) AS position, l.arrival, l.departure, l.photos
        FROM days d
        LEFT JOIN locations l ON d.id = l.day_id
        WHERE d.voyage_id = $1 AND d.day_number = $2;
      `;

      const routesQuery = `
        SELECT r.start_index, r.end_index, r.mode
        FROM days d
        LEFT JOIN routes r ON d.id = r.day_id
        WHERE d.voyage_id = $1 AND d.day_number = $2;
      `;

      // Exécuter les deux requêtes en parallèle
      const [locationsResult, routesResult] = await Promise.all([
        pool.query(locationsQuery, [voyageId, day]),
        pool.query(routesQuery, [voyageId, day])
      ]);

      const locationsRows = locationsResult.rows;
      const routesRows = routesResult.rows;

      if (locationsRows.length === 0) {
        return res.status(404).json({ status: 'error', message: 'Day not found' });
      }

      // Transformation des données des locations
      const locations = locationsRows.map(row => {
        const geoJsonPosition = JSON.parse(row.position);
        const transformedPosition = geoJsonPosition.coordinates
          ? [geoJsonPosition.coordinates[1], geoJsonPosition.coordinates[0]] // [latitude, longitude]
          : [0, 0];

        return {
          id: row.location_id,
          name: row.name,
          description: row.description,
          position: transformedPosition,
          arrival: row.arrival,
          departure: row.departure,
          photos: row.photos
        };
      });

      // Transformation des données des routes
      const routes = routesRows.map(route => ({
        startIndex: route.start_index,
        endIndex: route.end_index,
        mode: route.mode
      }));

      // Renvoyer la réponse finale
      res.json({
          day: parseInt(day, 10),
          locations,
          routes
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
);

module.exports = router;