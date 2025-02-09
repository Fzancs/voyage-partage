# voyage-partage

Creer la base de donnée et ajouter les tables
```sql
CREATE ROLE testuser WITH LOGIN PASSWORD 'testpassword';

CREATE DATABASE voyage_partage OWNER testuser;

\c voyage_partage;

CREATE EXTENSION postgis

CREATE TABLE voyages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE days (
    id SERIAL PRIMARY KEY,
    voyage_id INTEGER REFERENCES voyages(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    day_id INTEGER REFERENCES days(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    position GEOMETRY(POINT, 4326),
    arrival TIME,
    departure TIME,
    photos TEXT[]
);

CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    day_id INTEGER REFERENCES days(id) ON DELETE CASCADE,
    start_index INTEGER,
    end_index INTEGER,
    mode VARCHAR(50)
);

GRANT ALL PRIVILEGES ON DATABASE voyage_partage TO testuser;

-- Donnez tous les droits sur les tables, vues, séquences, etc.
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO testuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO testuser;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO testuser;

-- Pour que testuser ait automatiquement les droits sur les futurs objets
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON TABLES TO testuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON SEQUENCES TO testuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON FUNCTIONS TO testuser;

-- ¨Pour supprimer la base de donnée
REASSIGN OWNED BY testuser TO postgres;
DROP OWNED BY testuser;
DROP DATABASE IF EXISTS voyage_partage;
DROP USER IF EXISTS testuser;
```

Script pour ajouter les informations du voyage dans la base de donnée

```bash
npm run add-data
```

Installer les paquets et lancer le back et front
```bash
npm run install-all
npm run start-back
npm run start-front
```


## **Méthodes de requêtes de l'API**

### **1. Récupérer la liste des voyages**
- **Méthode** : `GET`
- **Endpoint** : `/api/voyages`

#### **Description**
Renvoie la liste des voyages, incluant leur nom et le nombre total de jours associés.

#### **Exemple de requête**
```
GET /api/voyages
```
```json
[
  {
    "id": 1,
    "name": "Voyage à Paris",
    "totalDays": 3
  },
  {
    "id": 2,
    "name": "Voyage en Italie",
    "totalDays": 2
  }
]
```

### **2. Récupérer les informations d'un jour spécifique**
- **Méthode** : `GET`
- **Endpoint** : `/:voyageId/days/:day`
  
#### **Description**
Récupère les informations des points d'intérêt et des routes pour un jour spécifique dans un voyage.

#### **Paramètres**
| Paramètre   | Type      | Requis | Description                             |
|-------------|-----------|--------|-----------------------------------------|
| voyageId    | `integer` | Oui    | Identifiant unique du voyage            |
| day         | `integer` | Oui    | Numéro du jour dans le voyage           |

#### **Exemple de requête**
```
GET /api/voyages/1/days/2
```
```json
{
  "day": 2,
  "locations": [
    {
      "id": 6,
      "name": "Montmartre",
      "description": "Un quartier célèbre pour ses artistes et sa basilique.",
      "position": [
        48.8867,
        2.3431
      ],
      "arrival": "09:00:00",
      "departure": "11:00:00",
      "photos": [
        "https://www.francetourisme.fr/media/Montmartre_jour/sacre-coeur-jour-escaliers.jpg"
      ]
    },
    {
      "id": 7,
      "name": "Arc de Triomphe",
      "description": "Un célèbre monument historique à Paris.",
      "position": [
        48.8738,
        2.295
      ],
      "arrival": "12:00:00",
      "departure": "14:00:00",
      "photos": [
        "https://res.cloudinary.com/dtljonz0f/image/upload/c_fill,w_256,h_256,g_auto/f_auto/q_auto/v1/gc-v1/paris/Sans%20titre%20(37)?_a=BAVARSAP0g"
      ]
    }
  ],
  "routes": [
    {
      "startIndex": 0,
      "endIndex": 1,
      "mode": "foot-walking"
    }
  ]
}
```
