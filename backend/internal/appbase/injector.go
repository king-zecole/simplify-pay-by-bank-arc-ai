package appbase

import (
	"github.com/go-chi/chi/v5"
	"gorm.io/gorm"

	"kingzecole/pay-by-bank-service/internal/api/server"

	v1 "kingzecole/pay-by-bank-service/internal/api/v1"
	"kingzecole/pay-by-bank-service/internal/repository"
	"kingzecole/pay-by-bank-service/internal/service"
)

// Inject sets up the application dependencies and returns the API router
func WithInjector(cfg *Config, db *gorm.DB, r *chi.Mux) {
	// 1. Repositories
	accountRepo := repository.NewPostgresRepository(db)

	// 2. Services
	accountService := service.NewAccountService(accountRepo)

	// 3. API Server (Generated Interface Implementation)
	accountServer := v1.NewAccountServer(accountService)

	// 4. Register Routes
	r.Mount("/api/v1", server.HandlerFromMux(accountServer, chi.NewRouter()))
}
