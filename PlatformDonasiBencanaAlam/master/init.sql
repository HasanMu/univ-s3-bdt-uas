-- ================================
-- ROLE
-- ================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_roles WHERE rolname = 'admin'
  ) THEN
    CREATE ROLE admin WITH LOGIN PASSWORD 'password123';
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_roles WHERE rolname = 'replicator'
  ) THEN
    CREATE ROLE replicator
      WITH LOGIN
      REPLICATION
      PASSWORD 'replica123';
  END IF;
END
$$;

DO $$
BEGIN
    EXECUTE 'GRANT ALL PRIVILEGES ON DATABASE ' || current_database() || ' TO admin';
END
$$;

-- NOTE: This file is superseded by init.sql.template and the render script (00-render-init.sh).
-- The template is used at container init time and values are rendered from ALLOWED_REGIONS_SQL.
-- If you want to change initialization behavior, edit init.sql.template instead.

-- ================================
-- TABLE: BENCANA
-- Horizontal Fragmentation by region
-- ================================
CREATE TABLE IF NOT EXISTS bencana (
    id_bencana SERIAL PRIMARY KEY,
    nama_bencana VARCHAR(255) NOT NULL,
    region VARCHAR(100) NOT NULL
      CHECK (region IN (${ALLOWED_REGIONS_SQL})),
    status VARCHAR(20) DEFAULT 'Active'
      CHECK (status IN ('Active', 'Closed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- TABLE: DONASI
-- Derivative Fragmentation
-- ================================
CREATE TABLE IF NOT EXISTS donasi (
    id_donasi SERIAL PRIMARY KEY,
    id_bencana INTEGER NOT NULL
      REFERENCES bencana(id_bencana) ON DELETE CASCADE,
    nama_donatur VARCHAR(255) NOT NULL,
    nominal DECIMAL(15,2) NOT NULL CHECK (nominal > 0),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- INDEXES
-- ================================
CREATE INDEX IF NOT EXISTS idx_bencana_status ON bencana(status);
CREATE INDEX IF NOT EXISTS idx_bencana_region ON bencana(region);
CREATE INDEX IF NOT EXISTS idx_donasi_bencana ON donasi(id_bencana);
CREATE INDEX IF NOT EXISTS idx_donasi_timestamp ON donasi(timestamp);

-- Ensure admin has access to schema, tables and sequences (both existing and future objects)
GRANT USAGE ON SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;
-- Make future created tables/sequences grant to admin by default
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO admin;
