package service

import (
	"context"
	"testing"

	"kingzecole/pay-by-bank-service/internal/models"
	mocks "kingzecole/pay-by-bank-service/internal/repository/mocks" // Import generated mocks

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestVerifyUser(t *testing.T) {
	// Setup
	mockRepo := mocks.NewMockRepository(t) // Use generated mock
	svc := NewAccountService(mockRepo)
	ctx := context.Background()

	// Test Case 1: Valid Request
	t.Run("Valid Request", func(t *testing.T) {
		req := models.MandateRequest{
			User: models.User{
				FullName: "John Doe",
				Email:    "john@example.com",
				// Using a specialized valid IBAN or just matching the length check in Validator
				IBAN: "DE123456789012345678",
			},
			Bank: models.Bank{
				ID:   "1",
				Name: "Test Bank",
			},
		}

		mockRepo.On("CreateMandate", ctx, mock.AnythingOfType("*models.Mandate")).Return(nil)

		result, err := svc.CreateAccount(ctx, req)

		assert.NoError(t, err)
		assert.True(t, result.Success)
		assert.Equal(t, "Bank account verified and created successfully", result.Message)
		mockRepo.AssertExpectations(t)
	})

	// Test Case 2: Invalid IBAN
	t.Run("Invalid IBAN", func(t *testing.T) {
		req := models.MandateRequest{
			User: models.User{
				FullName: "John Doe",
				Email:    "john@example.com",
				IBAN:     "SHORT", // Too short
			},
			Bank: models.Bank{ID: "1", Name: "Test Bank"},
		}

		result, err := svc.CreateAccount(ctx, req)

		assert.NoError(t, err) // Should not return error, but success=false
		assert.False(t, result.Success)
		assert.Equal(t, "Invalid IBAN format", result.Message)
		// Repository should NOT be called
		mockRepo.AssertNotCalled(t, "CreateMandate")
	})
}
