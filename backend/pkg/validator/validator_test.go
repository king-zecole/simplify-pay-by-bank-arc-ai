package validator

import "testing"

func TestValidateIBAN(t *testing.T) {
	tests := []struct {
		iban  string
		valid bool
	}{
		{"DE123456789012345678", true},            // 22 chars
		{"  de 123 456  ", false},                 // formatting removed -> 8 chars -> Invalid
		{"DE12345679012345678901234567890", true}, // 31 chars
		{"SHORT", false},
	}

	for _, tt := range tests {
		if got := ValidateIBAN(tt.iban); got != tt.valid {
			t.Errorf("ValidateIBAN(%s) = %v, want %v", tt.iban, got, tt.valid)
		}
	}
}
