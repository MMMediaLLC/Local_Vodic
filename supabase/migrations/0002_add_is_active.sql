-- Add is_active column to profiles.
-- Existing profiles default to true (visible). Admin can set false to hide without deleting.
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON profiles(is_active);
