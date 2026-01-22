package models

import "time"

// User represents the user data
type User struct {
	FullName string `json:"fullName" gorm:"not null"`
	Email    string `json:"email" gorm:"not null"`
	IBAN     string `json:"iban" gorm:"not null"`
}

// Bank represents the bank data
type Bank struct {
	ID   string `json:"id" gorm:"column:bank_id;not null"`
	Name string `json:"name" gorm:"column:bank_name;not null"`
	Code string `json:"code" gorm:"column:bank_code;not null"`
}

// MandateRequest represents the incoming mandate request
type MandateRequest struct {
	User User `json:"user" gorm:"embedded;embeddedPrefix:user_"`
	Bank Bank `json:"bank" gorm:"embedded"`
}

// Mandate represents the persisted mandate record
// GORM will map this to the 'mandates' table
type Mandate struct {
	ID        string    `json:"mandateId" gorm:"primaryKey;column:mandate_id"`
	User      User      `json:"user" gorm:"embedded;embeddedPrefix:user_"`
	Bank      Bank      `json:"bank" gorm:"embedded"`
	Success   bool      `json:"success" gorm:"column:success"`
	Message   string    `json:"message" gorm:"column:message"`
	Timestamp time.Time `json:"timestamp" gorm:"column:verified_at"`
}
