PORT=${DB_PORT:-"5432"}

echo "Running migration on: ${DB_HOST}:${PORT}"
while ! pg_isready -h "${DB_HOST}" -p "${PORT}" -U "${DB_USER}" ; do 
  echo "Waiting for database..."
  sleep 1 
done

migrate -path ./db/migrations \

  -database "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${PORT}/${DB_NAME}?sslmode=disable"\
  up
