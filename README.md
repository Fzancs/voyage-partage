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
