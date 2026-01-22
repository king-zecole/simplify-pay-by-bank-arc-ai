package validator

import "strings"

// ValidateIBAN checks if the provided IBAN format is valid.
// This is a basic validation. For production, use a library like checks/iban.
func ValidateIBAN(iban string) bool {
	// Remove spaces and convert to uppercase
	iban = strings.ToUpper(strings.ReplaceAll(iban, " ", ""))
	// Basic length check (IBANs are typically 15-34 characters)
	return len(iban) >= 15 && len(iban) <= 34
}
