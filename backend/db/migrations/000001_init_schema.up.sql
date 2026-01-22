CREATE TABLE IF NOT EXISTS verifications (
    verification_id VARCHAR(50) PRIMARY KEY,
    user_full_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_iban VARCHAR(100) NOT NULL,
    bank_id VARCHAR(50) NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    bank_code VARCHAR(50) NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    success BOOLEAN DEFAULT TRUE,
    message TEXT
);
