PORT=${DB_PORT:-"5432"}

echo "Running migration on: ${DB_HOST}:${PORT}"
while ! nc -z "${DB_HOST}" "${PORT}" ; do sleep 1 ; done
migrate -path ./db/migrations \
  -database "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/${DB_NAME}?sslmode=disable"\
  up
