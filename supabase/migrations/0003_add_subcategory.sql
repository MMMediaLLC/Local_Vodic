-- Add optional subcategory column to profiles.
-- Part of the 10-category × 5-subcategory restructure.
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subcategory text;
