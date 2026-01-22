package utils

import (
	"strings"
	"testing"
)

func TestGenerateVerificationID(t *testing.T) {
	id1 := GenerateVerificationID()
	id2 := GenerateVerificationID()

	if id1 == id2 {
		t.Errorf("GenerateVerificationID() returned duplicates: %s", id1)
	}
	if !strings.HasPrefix(id1, "VRF-") {
		t.Errorf("ID should start with VRF-, got %s", id1)
	}
}

func TestMaskIBAN(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{"DE12345678901234567890", "DE12**************7890"}, // Length 22: 4 + 14('*') + 4
		{"SHORT", "SHORT"},
		{"12345678", "12345678"}, // Length 8: 4 + 0('*') + 4
	}

	for _, tt := range tests {
		result := MaskIBAN(tt.input)
		if result != tt.expected {
			t.Errorf("MaskIBAN(%s) = %s, want %s", tt.input, result, tt.expected)
		}
	}
}
