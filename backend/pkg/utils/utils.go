package utils

import (
	"fmt"
	"math/rand"
	"strings"
	"time"
)

// GenerateVerificationID generates a unique ID for verifications.
func GenerateVerificationID() string {
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, 9)
	for i := range b {
		b[i] = charset[rand.Intn(len(charset))] // Note: Use crypto/rand for production security
	}
	return fmt.Sprintf("VRF-%d-%s", time.Now().Unix(), string(b))
}

// MaskIBAN masks all but the first 4 and last 4 characters of an IBAN.
func MaskIBAN(iban string) string {
	if len(iban) < 8 {
		return iban
	}
	return iban[:4] + strings.Repeat("*", len(iban)-8) + iban[len(iban)-4:]
}
