#!/bin/bash
set -e

if [ ! -s "$PGDATA/PG_VERSION" ]; then
  echo "Waiting for master $MASTER_HOST..."
  until pg_isready -h "$MASTER_HOST" -p 5432; do
    sleep 2
  done

  echo "Running base backup from $MASTER_HOST"
  rm -rf "$PGDATA"/*
  mkdir -p "$PGDATA"
  # Ensure data directory permissions are secure (700) and owned by postgres when running as root
  if [ "$(id -u)" = '0' ]; then
    chown -R postgres:postgres "$PGDATA"
    chmod 700 "$PGDATA"
  fi
  # Use MASTER_PASSWORD if provided; fallback to replica123
  PGPW="${MASTER_PASSWORD:-replica123}"

  # Run pg_basebackup as the unprivileged 'postgres' user when possible
  if [ "$(id -u)" = '0' ]; then
    if command -v gosu >/dev/null 2>&1; then
      PGPASSWORD="$PGPW" gosu postgres pg_basebackup \
        -h "$MASTER_HOST" \
        -U replicator \
        -D "$PGDATA" \
        -Fp -Xs -P -R
      # ensure correct ownership/permissions in case pg_basebackup left them wrong
      chown -R postgres:postgres "$PGDATA"
      chmod 700 "$PGDATA"
      exec_cmd="gosu postgres postgres"
    elif command -v su-exec >/dev/null 2>&1; then
      PGPASSWORD="$PGPW" su-exec postgres pg_basebackup \
        -h "$MASTER_HOST" \
        -U replicator \
        -D "$PGDATA" \
        -Fp -Xs -P -R
      chown -R postgres:postgres "$PGDATA"
      chmod 700 "$PGDATA"
      exec_cmd="su-exec postgres postgres"
    else
      # No gosu/su-exec available: run as root then fix ownership
      PGPASSWORD="$PGPW" pg_basebackup \
        -h "$MASTER_HOST" \
        -U replicator \
        -D "$PGDATA" \
        -Fp -Xs -P -R
      chown -R postgres:postgres "$PGDATA"
      exec_cmd="su -s /bin/sh -c 'postgres' postgres"
    fi
  else
    PGPASSWORD="$PGPW" pg_basebackup \
      -h "$MASTER_HOST" \
      -U replicator \
      -D "$PGDATA" \
      -Fp -Xs -P -R
    # If running as non-root (postgres), try to set secure perms but ignore failures
    chmod 700 "$PGDATA" 2>/dev/null || true
    exec_cmd="postgres"
  fi
fi

echo "Starting PostgreSQL standby..."
# Start postgres as unprivileged 'postgres' user (use fallback if needed)
if [ -n "$exec_cmd" ]; then
  eval "exec $exec_cmd"
elif [ "$(id -u)" = '0' ]; then
  # If still root, try gosu/su-exec/postgres user switch
  if command -v gosu >/dev/null 2>&1; then
    exec gosu postgres postgres
  elif command -v su-exec >/dev/null 2>&1; then
    exec su-exec postgres postgres
  else
    exec su -s /bin/sh -c 'postgres' postgres
  fi
else
  exec postgres
fi
