ALTER TABLE mandates RENAME TO verifications;
ALTER TABLE verifications RENAME COLUMN mandate_id TO verification_id;
