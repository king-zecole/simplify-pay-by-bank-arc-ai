ALTER TABLE verifications RENAME TO mandates;
ALTER TABLE mandates RENAME COLUMN verification_id TO mandate_id;
