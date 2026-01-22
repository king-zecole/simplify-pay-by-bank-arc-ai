package main

import (
	"fmt"
	"log"
	"net/http"

	"kingzecole/pay-by-bank-service/internal/appbase"
)

func main() {
	// 1. Load Config
	cfg, err := appbase.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// 2. Connect to Database (GORM)
	gormDB, err := appbase.WithDbConnect(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	// GORM handles connection pooling, but if we need underlying sql.DB to close:
	sqlDB, err := gormDB.DB()
	if err == nil {
		defer sqlDB.Close()
	}

	// 3. Setup Router
	r := appbase.WithRouterSetup()

	// 4. Inject Dependencies
	appbase.WithInjector(cfg, gormDB, r)

	// 5. Start Server
	port := cfg.App.Port
	fmt.Printf("Server starting on port %s\n", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
