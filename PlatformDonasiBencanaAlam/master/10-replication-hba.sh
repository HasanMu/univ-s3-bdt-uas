#!/bin/bash
set -e

echo "Configuring pg_hba.conf for replication..."

cat >> "$PGDATA/pg_hba.conf" <<EOF

# Allow replication connections
host replication replicator 172.20.0.0/16 md5
EOF
