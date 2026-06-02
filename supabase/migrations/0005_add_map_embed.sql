-- Optional manually-set Google Maps embed for the profile's bottom map,
-- used when the auto-detected location is not accurate.
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS map_embed text;
