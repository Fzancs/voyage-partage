require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const voyages = [
  {
    name: 'Voyage à Paris',
    description: 'Un voyage de découverte à Paris',
    data: {
      days: [
        {
          day: 1,
          locations: [
            {
              name: "Musée du Louvre",
              position: [48.8606, 2.3376],
              description: "Un célèbre musée d'art à Paris.",
              photos: ["https://static.the-escapers.com/media/cache/original/uploads/images/companies/5e99f0f081aca687259826.jpeg.webp"],
              arrival: "09:00",
              departure: "12:00"
            },
            {
              name: "Tour Eiffel",
              position: [48.8584, 2.2945],
              description: "La célèbre tour de Paris.",
              photos: ["https://www.toureiffel.paris/themes/custom/tour_eiffel/build/images/home-discover-bg.jpg"],
              arrival: "14:00",
              departure: "17:00"
            },
            {
              name: "Cathédrale Notre-Dame",
              position: [48.8529, 2.3500],
              description: "Une célèbre cathédrale gothique à Paris.",
              photos: ["https://images.stockcake.com/public/6/6/5/665db2e4-dea3-47f1-a6f3-49fcaa282550_medium/historic-cathedral-facade-stockcake.jpg"],
              arrival: "17:30",
              departure: "19:00"
            },
            {
              name: "Pont Alexandre III",
              position: [48.8639, 2.3130],
              description: "Un célèbre pont de Paris offrant une vue magnifique sur la Seine.",
              photos: ["https://example.com/pont-alexandre.jpg"],
              arrival: "19:30",
              departure: "20:30"
            },
            {
              name: "Champs-Élysées",
              position: [48.8698, 2.3074],
              description: "Une des avenues les plus célèbres au monde.",
              photos: ["https://example.com/champs-elysees.jpg"],
              arrival: "21:00",
              departure: "22:00"
            }
          ],
          routes: [
            { startIndex: 0, endIndex: 1, mode: "foot-walking" },
            { startIndex: 1, endIndex: 2, mode: "driving-car" },
            { startIndex: 2, endIndex: 3, mode: "driving-car" },
            { startIndex: 3, endIndex: 4, mode: "foot-walking" }
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
            },
            {
              name: "Opéra Garnier",
              position: [48.8709, 2.3316],
              description: "Un célèbre opéra à Paris.",
              photos: ["https://example.com/opera-garnier.jpg"],
              arrival: "16:30",
              departure: "18:00"
            },
            {
              name: "Place Vendôme",
              position: [48.8686, 2.3296],
              description: "Une célèbre place de Paris avec des boutiques de luxe.",
              photos: ["https://example.com/place-vendome.jpg"],
              arrival: "18:30",
              departure: "19:30"
            },
            {
              name: "Pont des Arts",
              position: [48.8575, 2.3400],
              description: "Un pont piéton offrant une belle vue sur la Seine.",
              photos: ["https://example.com/pont-des-arts.jpg"],
              arrival: "20:00",
              departure: "21:00"
            }
          ],
          routes: [
            { startIndex: 0, endIndex: 1, mode: "foot-walking" },
            { startIndex: 1, endIndex: 2, mode: "foot-walking" },
            { startIndex: 2, endIndex: 3, mode: "driving-car" },
            { startIndex: 3, endIndex: 4, mode: "foot-walking" }
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
            },
            {
              name: "Musée d'Orsay",
              position: [48.8599, 2.3266],
              description: "Un musée célèbre abritant des œuvres impressionnistes.",
              photos: ["https://example.com/musee-orsay.jpg"],
              arrival: "17:30",
              departure: "19:00"
            },
            {
              name: "Les Invalides",
              position: [48.8566, 2.3125],
              description: "Un complexe contenant un musée militaire et le tombeau de Napoléon.",
              photos: ["https://example.com/invalides.jpg"],
              arrival: "19:30",
              departure: "21:00"
            }
          ],
          routes: [
            { startIndex: 0, endIndex: 1, mode: "foot-walking" },
            { startIndex: 1, endIndex: 2, mode: "foot-walking" },
            { startIndex: 2, endIndex: 3, mode: "foot-walking" },
            { startIndex: 3, endIndex: 4, mode: "foot-walking" }
          ]
        }
      ]
    }
  },
  {
    name: 'Voyage en Italie',
    description: 'Un voyage pour découvrir les merveilles de l’Italie',
    data: {
      days: [
        {
          day: 1,
          locations: [
            {
              name: "Colisée",
              position: [41.8902, 12.4922],
              description: "Un amphithéâtre romain emblématique situé à Rome.",
              photos: ["https://example.com/colisee.jpg"],
              arrival: "09:00",
              departure: "12:00"
            },
            {
              name: "Fontaine de Trevi",
              position: [41.9009, 12.4833],
              description: "Une célèbre fontaine baroque de Rome.",
              photos: ["https://example.com/fontaine-trevi.jpg"],
              arrival: "13:00",
              departure: "14:30"
            },
            {
              name: "Panthéon de Rome",
              position: [41.8986, 12.4769],
              description: "Un ancien temple romain dédié à tous les dieux.",
              photos: ["https://example.com/pantheon-rome.jpg"],
              arrival: "15:00",
              departure: "17:00"
            },
            {
              name: "Place d'Espagne",
              position: [41.9050, 12.4828],
              description: "Une célèbre place avec des escaliers monumentaux.",
              photos: ["https://example.com/place-espagne.jpg"],
              arrival: "17:30",
              departure: "19:00"
            },
            {
              name: "Basilique Saint-Pierre",
              position: [41.9029, 12.4534],
              description: "La plus grande église du christianisme située au Vatican.",
              photos: ["https://example.com/basilique-saint-pierre.jpg"],
              arrival: "19:30",
              departure: "21:00"
            }
          ],
          routes: [
            { startIndex: 0, endIndex: 1, mode: "foot-walking" },
            { startIndex: 1, endIndex: 2, mode: "foot-walking" },
            { startIndex: 2, endIndex: 3, mode: "foot-walking" },
            { startIndex: 3, endIndex: 4, mode: "foot-walking" }
          ]
        },
        {
          day: 2,
          locations: [
            {
              name: "Ponte Vecchio",
              position: [43.7679, 11.2531],
              description: "Un pont emblématique situé à Florence.",
              photos: ["https://example.com/ponte-vecchio.jpg"],
              arrival: "09:00",
              departure: "10:30"
            },
            {
              name: "Galerie des Offices",
              position: [43.7687, 11.2559],
              description: "Un célèbre musée d'art situé à Florence.",
              photos: ["https://example.com/uffizi.jpg"],
              arrival: "11:00",
              departure: "13:00"
            },
            {
              name: "Dôme de Florence",
              position: [43.7731, 11.2560],
              description: "La cathédrale emblématique de Florence.",
              photos: ["https://example.com/dome-florence.jpg"],
              arrival: "14:00",
              departure: "16:00"
            }
          ],
          routes: [
            { startIndex: 0, endIndex: 1, mode: "foot-walking" },
            { startIndex: 1, endIndex: 2, mode: "foot-walking" }
          ]
        }
      ]
    }
  }
];

async function insertData() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const voyage of voyages) {
      // Insert voyage
      const voyageResult = await client.query(
        'INSERT INTO voyages (name, description) VALUES ($1, $2) RETURNING id',
        [voyage.name, voyage.description]
      );
      const voyageId = voyageResult.rows[0].id;

      for (const day of voyage.data.days) {
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