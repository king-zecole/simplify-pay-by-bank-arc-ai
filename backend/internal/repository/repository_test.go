package repository

import (
	"context"
	"fmt"
	"os"
	"testing"
	"time"

	"kingzecole/pay-by-bank-service/internal/models"

	"github.com/stretchr/testify/assert"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func setupTestDB(t *testing.T) *gorm.DB {
	// Assumes postgres is running via docker-compose on localhost:5432
	dsn := os.Getenv("TEST_DB_DSN")
	if dsn == "" {
		dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC",
			"localhost", "user", "password", "bankdb", "5432")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		t.Skip("Skipping integration test: cannot connect to DB")
	}

	sqlDB, err := db.DB()
	if err != nil {
		t.Skip("Skipping integration test: cannot get sql.DB")
	}
	if err := sqlDB.Ping(); err != nil {
		t.Skip("Skipping integration test: cannot ping DB")
	}

	// Ensure schema exists
	err = db.AutoMigrate(&models.Mandate{})
	if err != nil {
		t.Fatalf("Failed to migrate: %v", err)
	}

	return db
}

func TestCreateMandate(t *testing.T) {
	db := setupTestDB(t)
	// Cleanup - database-agnostic way to clear table
	db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&models.Mandate{})

	repo := NewPostgresRepository(db)
	ctx := context.Background()

	mandate := &models.Mandate{
		ID:        "VRF-TEST-1",
		User:      models.User{FullName: "Test User", Email: "test@example.com", IBAN: "DE123"},
		Bank:      models.Bank{ID: "B1", Name: "Test Bank", Code: "TEST"},
		Success:   true,
		Message:   "Verified",
		Timestamp: time.Now().UTC(),
	}

	err := repo.CreateMandate(ctx, mandate)
	assert.NoError(t, err)

	// Verify persistence using GORM
	var found models.Mandate
	result := db.Where("mandate_id = ?", mandate.ID).First(&found)
	assert.NoError(t, result.Error)
	assert.Equal(t, mandate.ID, found.ID)
	assert.Equal(t, mandate.User.FullName, found.User.FullName)
}
