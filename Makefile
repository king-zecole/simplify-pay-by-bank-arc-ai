env:
	@if not exist .env copy .env.example .env

build-app: env
	docker compose build app

dev: build-app
	docker compose run --rm app sh

server: build-app
	docker compose up -d app

run-all: build-app \
	migrate \
	server

lint:
	golangci-lint run -v --fix

test: build-app
	go test -shuffle=on -count=1 ./backend/...

clean:
	docker compose down --remove-orphans --volumes

generate: build-app
	docker compose run --rm app sh ./backend/scripts/generate.sh

create-migration: build-app
	docker compose run --rm app sh backend/db/scripts/create_migration.sh $(name)

migrate:
	docker compose up -d postgres
	docker compose run --rm app sh backend/db/scripts/migrate.sh

schema-dump: build-app
	docker compose run --rm app sh -c "sh backend/db/scripts/dump.sh > backend/db/schema.sql"