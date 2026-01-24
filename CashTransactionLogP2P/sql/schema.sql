-- Aktifkan extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Metadata node
CREATE TABLE IF NOT EXISTS nodes (
    node_id     VARCHAR(50) PRIMARY KEY,
    node_name   VARCHAR(100) NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Log transaksi pembayaran tunai (append-only)
CREATE TABLE IF NOT EXISTS transaction_logs (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_id           VARCHAR(50) NOT NULL,
    transaction_code  VARCHAR(50) NOT NULL,
    amount            NUMERIC(12,2) NOT NULL,
    transaction_time  TIMESTAMP NOT NULL,
    created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_transaction_node
        FOREIGN KEY (node_id)
        REFERENCES nodes(node_id)
);
