# Pay-By-Bank Full-Stack Application

A modern, full-stack application for creating bank account verifications (mandates). This project demonstrates a robust architecture using **Next.js** for the frontend, **Go** for the backend, and **PostgreSQL** for data persistence.

## 🚀 Architecture & Technical Stack

The project follows a modular design, separating the user interface from the business logic and data storage.

### 💻 Frontend (Next.js)
- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS & Lucide icons
- **State Management**: React Hooks
- **Architecture**: Domain-driven directory structure with clear separation of UI components and infrastructure logic.

### ⚙️ Backend (Go)
- **Language**: Go 1.25.6
- **Web Framework**: Chi Router
- **ORM**: GORM (with PostgreSQL driver)
- **API**: OpenAPI 3.0 (Contract-First approach with `oapi-codegen`)
- **Structure**: Clean Architecture (API Layer, Service Layer, Repository Layer)

### 💾 Database & Infrastructure
- **Database**: PostgreSQL 15
- **Orchestration**: Docker & Docker Compose
- **Migrations**: `golang-migrate`

---

## 🛠️ Getting Started

### Prerequisites
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [pnpm](https://pnpm.io/installation) (for local frontend development)
- [Go 1.25.6+](https://go.dev/doc/install) (for local backend development)

### Quick Start with Docker
Launch the entire stack with a single command:

```bash
make run-all
```
This will:
1. Setup your `.env` file (if not present).
2. Build the Docker images.
3. Start the Postgres database.
4. Run all database migrations.
5. Start the Backend and Frontend servers.

**Access the application:**
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8080/api/v1](http://localhost:8080/api/v1)
- **Health Check**: [http://localhost:8080/api/v1/health](http://localhost:8080/api/v1/health)

---

## 📖 Makefile Guide

The project uses a `Makefile` to simplify common development tasks.

| Command | Description |
| :--- | :--- |
| `make build` | Builds all Docker containers. |
| `make server`| Starts all services in detached mode. |
| `make migrate` | Runs the backend database migrations. |
| `make run-all` | Full setup: Build → Migrate → Start Server. |
| `make test` | Runs Go backend unit and integration tests inside Docker. |
| `make test-app` | Runs frontend unit tests. |
| `make lint` | Runs `golangci-lint` (v2.8.0) inside the backend container. |
| `make clean` | Stops and removes all containers, networks, and volumes. |
| `make generate` | Re-generates Go API code from the OpenAPI spec. |
| `make schema-dump` | Dumps the current DB schema to `backend/db/schema.sql`. |

---

## 📂 Project Structure

```text
.
├── backend/
│   ├── cmd/server/       # Application entry point
│   ├── db/
│   │   ├── migrations/   # SQL migration files
│   │   └── scripts/      # Database management scripts
│   ├── internal/
│   │   ├── api/          # Generated API routes & handlers
│   │   ├── appbase/      # Core app configuration & initialization
│   │   ├── models/       # Shared business entities
│   │   ├── repository/   # Data access logic (GORM)
│   │   └── service/      # Business logic layer
│   └── openapi/          # OpenAPI specification (openapi.yaml)
├── frontend/
│   ├── app/              # Next.js pages and layouts
│   ├── components/       # Reusable UI components
│   ├── lib/              # Frontend infrastructure and logic
│   └── public/           # Static assets
└── docker-compose.yml    # Main orchestration file
```

---

## 📋 API Endpoints

The API is documented via OpenAPI. Key endpoints include:

- `GET /api/v1/health`: Checks the status of the service and database connection.
- `POST /api/v1/create-account`: Creates a new account mandate and persists it to the database.

---

## 🔒 Security & Quality
- **Type Safety**: End-to-end type safety using TypeScript and Go.
- **Validation**: Strict IBAN and Email validation on both frontend and backend.
- **Testing**:
    - Backend: Mock-based unit testing and database integration testing.
    - Frontend: Jest-based component testing.
- **Linting**: High standards enforced via `golangci-lint` and `ESLint`.
