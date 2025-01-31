require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const voyageName = 'Voyage à Paris';
const description = 'Un voyage de découverte à Paris';

const data = {
  days: [
    {
      day: 1,
      locations: [
        {
          name: "Musée du Louvre",
          position: [48.8606, 2.3376],
          description: "Un célèbre musée d'art à Paris.",
          photos: ["https://example.com/louvre.jpg"],
          arrival: "09:00",
          departure: "12:00"
        },
        {
          name: "Tour Eiffel",
          position: [48.8584, 2.2945],
          description: "La célèbre tour de Paris.",
          photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/520px-Tour_Eiffel_Wikimedia_Commons.jpg"],
          arrival: "14:00",
          departure: "17:00"
        },
        {
          name: "Cathédrale Notre-Dame",
          position: [48.8529, 2.3500],
          description: "Une célèbre cathédrale gothique à Paris.",
          photos: ["https://example.com/notre-dame.jpg"],
          arrival: "17:30",
          departure: "19:00"
        }
      ],
      routes: [
        { startIndex: 0, endIndex: 1, mode: "foot-walking" },
        { startIndex: 1, endIndex: 2, mode: "driving-car" }
      ]
    },
    {
      day: 2,
      locations: [
        {
          name: "Montmartre",
          position: [48.8867, 2.3431],
          description: "Un quartier célèbre pour ses artistes et sa basilique.",
          photos: ["https://example.com/montmartre.jpg"],
          arrival: "09:00",
          departure: "12:00"
        },
        {
          name: "Arc de Triomphe",
          position: [48.8738, 2.2950],
          description: "Un célèbre monument historique à Paris.",
          photos: ["https://example.com/arc-triomphe.jpg"],
          arrival: "13:00",
          departure: "16:00"
        }
      ],
      routes: [
        { startIndex: 0, endIndex: 1, mode: "foot-walking" }
      ]
    },
    {
      day: 3,
      locations: [
        {
          name: "Place de la Concorde",
          position: [48.8656, 2.3211],
          description: "Une des plus grandes places de Paris, célèbre pour son obélisque.",
          photos: ["https://example.com/place-concorde.jpg"],
          arrival: "10:00",
          departure: "12:00"
        },
        {
          name: "Jardin du Luxembourg",
          position: [48.8462, 2.3372],
          description: "Un magnifique jardin public situé dans le Quartier Latin.",
          photos: ["https://example.com/jardin-luxembourg.jpg"],
          arrival: "13:00",
          departure: "15:00"
        },
        {
          name: "Panthéon",
          position: [48.8462, 2.3458],
          description: "Un mausolée dédié aux héros nationaux français.",
          photos: ["https://example.com/pantheon.jpg"],
          arrival: "15:30",
          departure: "17:00"
        }
      ],
      routes: [
        { startIndex: 0, endIndex: 1, mode: "foot-walking" },
        { startIndex: 1, endIndex: 2, mode: "foot-walking" }
      ]
    }
  ]
};

async function insertData() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Insert voyage
    const voyageResult = await client.query(
      'INSERT INTO voyages (name, description) VALUES ($1, $2) RETURNING id',
      [voyageName, description]
    );
    const voyageId = voyageResult.rows[0].id;

    for (const day of data.days) {
      // Insert day
      const dayResult = await client.query(
        'INSERT INTO days (voyage_id, day_number) VALUES ($1, $2) RETURNING id',
        [voyageId, day.day]
      );
      const dayId = dayResult.rows[0].id;

      for (const location of day.locations) {
        // Insert location
        await client.query(
          `INSERT INTO locations (day_id, name, description, position, arrival, departure, photos)
           VALUES ($1, $2, $3, ST_SetSRID(ST_Point($4, $5), 4326), $6, $7, $8)`,
          [
            dayId,
            location.name,
            location.description,
            location.position[1],
            location.position[0],
            location.arrival,
            location.departure,
            location.photos
          ]
        );
      }

      for (const route of day.routes) {
        // Insert route
        await client.query(
          'INSERT INTO routes (day_id, start_index, end_index, mode) VALUES ($1, $2, $3, $4)',
          [dayId, route.startIndex, route.endIndex, route.mode]
        );
      }
    }

    await client.query('COMMIT');
    console.log('Data inserted successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inserting data:', error);
  } finally {
    client.release();
  }
}

insertData();