package service

import (
	"context"
	"time"

	"kingzecole/pay-by-bank-service/internal/models"
	"kingzecole/pay-by-bank-service/internal/repository"
	"kingzecole/pay-by-bank-service/pkg/utils"
	"kingzecole/pay-by-bank-service/pkg/validator"
)

// Service defines the business logic interface
type IAccountService interface {
	CreateAccount(ctx context.Context, req models.MandateRequest) (*models.Mandate, error)
}

// AccountService implements Service
type AccountService struct {
	repo repository.Repository
}

// NewAccountService creates a new AccountService
func NewAccountService(repo repository.Repository) *AccountService {
	return &AccountService{repo: repo}
}

// CreateAccount processes the account creation request
func (s *AccountService) CreateAccount(ctx context.Context, req models.MandateRequest) (*models.Mandate, error) {
	// 1. Validate IBAN
	if !validator.ValidateIBAN(req.User.IBAN) {
		return &models.Mandate{
			Success:   false,
			Message:   "Invalid IBAN format",
			Timestamp: time.Now().UTC(),
		}, nil
	}

	// 2. Simulate processing delay
	time.Sleep(100 * time.Millisecond)

	// 3. Generate Result
	mandateID := utils.GenerateVerificationID()
	mandate := &models.Mandate{
		ID:        mandateID,
		User:      req.User,
		Bank:      req.Bank,
		Success:   true,
		Message:   "Bank account verified/created successfully",
		Timestamp: time.Now().UTC(),
	}

	// 4. Persist to Database
	if err := s.repo.CreateMandate(ctx, mandate); err != nil {
		return nil, err
	}

	return mandate, nil
}
