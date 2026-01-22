package appbase

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	custommiddleware "kingzecole/pay-by-bank-service/internal/middleware"
)

// Setup creates and configures the Chi router
func WithRouterSetup() *chi.Mux {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// Custom middleware
	r.Use(custommiddleware.CorsMiddleware)

	return r
}
