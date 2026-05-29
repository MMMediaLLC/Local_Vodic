-- Add private verification fields: tax number (ЕДБ) and registration number (ЕМБС).
-- Optional; used only to verify a subject for the "Верифициран профил" badge.
-- Not shown publicly.
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS edb text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS embs text;
