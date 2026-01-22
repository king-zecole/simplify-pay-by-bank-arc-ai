package integration

import (
	"net/http"
	"testing"

	"github.com/steinfletcher/apitest"
	jsonpath "github.com/steinfletcher/apitest-jsonpath"
	"gorm.io/gorm"

	"kingzecole/pay-by-bank-service/internal/api/testutils"
	"kingzecole/pay-by-bank-service/internal/appbase"
	config "kingzecole/pay-by-bank-service/internal/appbase"
	"kingzecole/pay-by-bank-service/internal/models"
)

func TestVerifyUserIntegration(t *testing.T) {
	// 1. Setup DB
	db := testutils.SetupTestDB(t)
	if db == nil {
		t.Skip("Database not available for integration tests")
	}

	// AutoMigrate for tests to ensure schema exists
	db.AutoMigrate(&models.Mandate{})
	// Cleanup - database-agnostic way to clear table
	db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&models.Mandate{})

	// 2. Setup App
	cfg := &config.Config{
		App: config.AppConfig{},
	}
	r := appbase.WithRouterSetup()
	appbase.WithInjector(cfg, db, r)

	// 3. Define Test Data
	reqBody := `{"user": {"fullName": "Integration Test", "email": "test@int.com", "iban": "DE123456789012345678"}, "bank": {"id": "1", "name": "Int Bank", "code": "INT"}}`

	// 4. Run Test
	apitest.New().
		Handler(r).
		Post("/api/v1/create-account").
		Body(reqBody).
		Expect(t).
		Status(http.StatusCreated).
		Assert(jsonpath.Equal("$.success", true)).
		Assert(jsonpath.Present("$.accountId")).
		End()
}
