-- Vérifier si le rôle 'testuser' existe avant de le créer
DO
$$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'testuser') THEN
        CREATE ROLE testuser WITH LOGIN PASSWORD 'testpassword';
    END IF;
END
$$;

-- Vérifier si la base de données 'voyage_partage' existe avant de la créer
DO
$$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'voyage_partage') THEN
        CREATE DATABASE voyage_partage OWNER testuser;
    END IF;
END
$$;

-- Connexion à la base de données
\c voyage_partage;

-- Activer l'extension PostGIS si elle n'existe pas encore
CREATE EXTENSION IF NOT EXISTS postgis;

-- Création des tables (évite les erreurs si elles existent déjà)
CREATE TABLE IF NOT EXISTS voyages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS days (
    id SERIAL PRIMARY KEY,
    voyage_id INTEGER REFERENCES voyages(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    day_id INTEGER REFERENCES days(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    position GEOMETRY(POINT, 4326),
    arrival TIME,
    departure TIME,
    photos TEXT[]
);

CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    day_id INTEGER REFERENCES days(id) ON DELETE CASCADE,
    start_index INTEGER,
    end_index INTEGER,
    mode VARCHAR(50)
);

-- Attribution des droits à testuser
GRANT ALL PRIVILEGES ON DATABASE voyage_partage TO testuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO testuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO testuser;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO testuser;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON TABLES TO testuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON SEQUENCES TO testuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON FUNCTIONS TO testuser;
