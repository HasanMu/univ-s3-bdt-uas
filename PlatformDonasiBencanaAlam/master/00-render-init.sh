#!/bin/bash
set -e

: "${ALLOWED_REGIONS_SQL:=DKI_Jakarta,Banten,Jawa_Barat}"

TEMPLATE="/docker-entrypoint-initdb.d/init.sql.template"
OUT_TMP="/tmp/init.sql"

if [ -f "$TEMPLATE" ]; then
  # Render template to a writable temp file (avoid writing to mounted dir which may be read-only)
  sed "s|\${ALLOWED_REGIONS_SQL}|$ALLOWED_REGIONS_SQL|g" "$TEMPLATE" > "$OUT_TMP"

  # Execute rendered SQL directly against the database
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f "$OUT_TMP"

  # Clean up
  rm -f "$OUT_TMP"
fi