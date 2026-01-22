package testutils

import (
	"fmt"
	"testing"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"kingzecole/pay-by-bank-service/internal/appbase"
)

func SetupTestDB(t *testing.T) *gorm.DB {
	// In a real scenario, this would connect to a dedicated test DB instance provided by Docker
	// For now, we can try to connect to the one defined in config, or skip if unavailable
	cfg, err := appbase.Load()
	if err != nil {
		t.Skip("Skipping integration test: cannot connect to DB")
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC",
		cfg.DB.Host, cfg.DB.User, cfg.DB.Password, cfg.DB.Name, cfg.DB.Port)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil
	}
	return db
}
