package repository

import (
	"context"
	"fmt"

	"kingzecole/pay-by-bank-service/internal/models"

	"gorm.io/gorm"
)

// Repository defines the interface for data persistence
type Repository interface {
	CreateMandate(ctx context.Context, v *models.Mandate) error
}

// PostgresRepository implements Repository for PostgreSQL using GORM
type PostgresRepository struct {
	db *gorm.DB
}

// NewPostgresRepository creates a new PostgresRepository
func NewPostgresRepository(db *gorm.DB) *PostgresRepository {
	return &PostgresRepository{db: db}
}

// CreateMandate inserts a new mandate record into the database
func (r *PostgresRepository) CreateMandate(ctx context.Context, v *models.Mandate) error {
	if err := r.db.WithContext(ctx).Create(v).Error; err != nil {
		return fmt.Errorf("failed to insert mandate: %w", err)
	}
	return nil
}
