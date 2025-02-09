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
              name: "Gare du Nord",
              position: [48.8809, 2.3553],
              description: "Une grande gare de Paris.",
              photos: ["https://parisjetaime.com/data/layout_image/9225_Gare-du-Nord-exterieur-facade--630x405--%C2%A9-OTCP-Jacques-Lebar--175-11_square_1-1_xl.jpg?ver=1700682193"],
              arrival: "19:30",
              departure: "20:30"
            },
            {
              name: "Champs-Élysées",
              position: [48.8698, 2.3074],
              description: "Une des avenues les plus célèbres au monde.",
              photos: ["https://www.lesmaconsparisiens.fr/wp-content/uploads/2014/11/avenue-champs-elysees-nuit.jpg"],
              arrival: "21:30",
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
              photos: ["https://www.francetourisme.fr/media/Montmartre_jour/sacre-coeur-jour-escaliers.jpg"],
              arrival: "09:00",
              departure: "11:00"
            },
            {
              name: "Arc de Triomphe",
              position: [48.8738, 2.2950],
              description: "Un célèbre monument historique à Paris.",
              photos: ["https://res.cloudinary.com/dtljonz0f/image/upload/c_fill,w_256,h_256,g_auto/f_auto/q_auto/v1/gc-v1/paris/Sans%20titre%20(37)?_a=BAVARSAP0g"],
              arrival: "12:00",
              departure: "14:00"
            },
            {
              name: "Opéra Garnier",
              position: [48.8709, 2.3316],
              description: "Un célèbre opéra à Paris.",
              photos: ["https://res.cloudinary.com/opera-national-de-paris/image/upload/c_crop,h_2000,w_3050,x_150,y_1300/c_scale,w_870/v1563286913/visites/Garnier%20visites%20autonomes%2023.jpg"],
              arrival: "14:30",
              departure: "16:00"
            },
            {
              name: "Place Vendôme",
              position: [48.8686, 2.3296],
              description: "Une célèbre place de Paris avec des boutiques de luxe.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "16:30",
              departure: "17:30"
            },
            {
              name: "Pont des Arts",
              position: [48.8575, 2.3400],
              description: "Un pont piéton offrant une belle vue sur la Seine.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "18:00",
              departure: "19:00"
            }
          ],
          routes: [
            { startIndex: 0, endIndex: 1, mode: "foot-walking" },
            { startIndex: 1, endIndex: 2, mode: "driving-car" },
            { startIndex: 2, endIndex: 3, mode: "foot-walking" },
            { startIndex: 3, endIndex: 4, mode: "driving-car" }
          ]
        },
        {
          day: 3,
          locations: [
            {
              name: "Place de la Concorde",
              position: [48.8656, 2.3211],
              description: "Une des plus grandes places de Paris, célèbre pour son obélisque.",
              photos: ["https://img.wongnai.com/p/256x256/2019/04/24/4df81c260a604c448795524809974724.jpg"],
              arrival: "10:00",
              departure: "11:30"
            },
            {
              name: "Jardin du Luxembourg",
              position: [48.8462, 2.3372],
              description: "Un magnifique jardin public situé dans le Quartier Latin.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "12:00",
              departure: "14:00"
            },
            {
              name: "Panthéon",
              position: [48.8462, 2.3458],
              description: "Un mausolée dédié aux héros nationaux français.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "14:30",
              departure: "16:00"
            },
            {
              name: "Musée d'Orsay",
              position: [48.8599, 2.3266],
              description: "Un musée célèbre abritant des œuvres impressionnistes.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "16:30",
              departure: "18:00"
            },
            {
              name: "Les Invalides",
              position: [48.8566, 2.3125],
              description: "Un complexe contenant un musée militaire et le tombeau de Napoléon.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "18:30",
              departure: "20:00"
            }
          ],
          routes: [
            { startIndex: 0, endIndex: 1, mode: "foot-walking" },
            { startIndex: 1, endIndex: 2, mode: "driving-car" },
            { startIndex: 2, endIndex: 3, mode: "foot-walking" },
            { startIndex: 3, endIndex: 4, mode: "driving-car" }
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
              description: "Le plus grand amphithéâtre de l'Empire romain.",
              photos: ["https://cdn.futura-sciences.com/buildsv6/images/square1280/7/0/5/705121344c_110004_colisee-rome.jpg"],
              arrival: "09:00",
              departure: "11:30"
            },
            {
              name: "Fontaine de Trevi",
              position: [41.9009, 12.4833],
              description: "Une fontaine baroque célèbre où les visiteurs jettent des pièces pour faire un vœu.",
              photos: ["https://romedestination.fr/wp-content/uploads/2021/08/trevi-sans-foule.jpg"],
              arrival: "12:00",
              departure: "13:30"
            },
            {
              name: "Panthéon",
              position: [41.8986, 12.4769],
              description: "Un monument emblématique de l'architecture antique.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "14:00",
              departure: "15:30"
            },
            {
              name: "Place Navone",
              position: [41.8992, 12.4731],
              description: "Une célèbre place romaine entourée de fontaines et de palais.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "16:00",
              departure: "17:30"
            },
            {
              name: "Château Saint-Ange",
              position: [41.9039, 12.4663],
              description: "Ancien mausolée transformé en forteresse et musée.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "18:00",
              departure: "19:30"
            }
          ],
          routes: [
            { startIndex: 0, endIndex: 1, mode: "foot-walking" },
            { startIndex: 1, endIndex: 2, mode: "driving-car" },
            { startIndex: 2, endIndex: 3, mode: "foot-walking" },
            { startIndex: 3, endIndex: 4, mode: "driving-car" }
          ]
        },
        {
          day: 2,
          locations: [
            {
              name: "Cathédrale de Florence (Duomo)",
              position: [43.7731, 11.2560],
              description: "La célèbre cathédrale Santa Maria del Fiore avec sa coupole impressionnante.",
              photos: ["https://cdn-imgix.headout.com/media/images/1300daf8e72cbe5623b8a4d84a398f1f-Duomo%20Florence%20golden%20hour.jpg"],
              arrival: "09:00",
              departure: "11:00"
            },
            {
              name: "Ponte Vecchio",
              position: [43.7687, 11.2551],
              description: "Un pont médiéval emblématique avec des boutiques d'orfèvres.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "11:30",
              departure: "12:30"
            },
            {
              name: "Galerie des Offices",
              position: [43.7678, 11.2553],
              description: "Un des plus célèbres musées d'art au monde.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "13:00",
              departure: "15:00"
            },
            {
              name: "Palais Pitti",
              position: [43.7644, 11.2492],
              description: "Un grand palais de la Renaissance abritant plusieurs musées et jardins.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "15:30",
              departure: "17:00"
            },
            {
              name: "Piazzale Michelangelo",
              position: [43.7629, 11.2658],
              description: "Une place offrant une vue panoramique sur Florence.",
              photos: ["https://img-0.journaldunet.com/nds11COnzaqETUTlqHDvQyy3YD0=/1500x/smart/ab68ae85e74c4b2691006c0467f8b7dc/ccmcms-jdn/25881466.jpg"],
              arrival: "17:30",
              departure: "19:00"
            }
          ],
          routes: [
            { startIndex: 0, endIndex: 1, mode: "foot-walking" },
            { startIndex: 1, endIndex: 2, mode: "driving-car" },
            { startIndex: 2, endIndex: 3, mode: "foot-walking" },
            { startIndex: 3, endIndex: 4, mode: "driving-car" }
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