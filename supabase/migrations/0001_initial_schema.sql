-- ============================================================
-- GPRESS Локален водич — Initial Schema
-- Paste this into the Supabase SQL Editor and click Run.
-- ============================================================

-- Profiles (businesses, services, institutions)
CREATE TABLE IF NOT EXISTS profiles (
  id                  text        PRIMARY KEY,
  name                text        NOT NULL,
  slug                text        NOT NULL UNIQUE,
  category            text        NOT NULL DEFAULT '',
  category_slug       text        NOT NULL DEFAULT '',
  location            text        NOT NULL DEFAULT 'Гостивар',
  short_description   text        NOT NULL DEFAULT '',
  full_description    text        NOT NULL DEFAULT '',
  phone               text        NOT NULL DEFAULT '',
  secondary_phone     text,
  email               text,
  website             text,
  facebook            text,
  instagram           text,
  address             text        NOT NULL DEFAULT '',
  working_hours       text,
  google_maps_url     text,
  logo                text,
  logo_shape          text        DEFAULT 'square',
  cover_image         text,
  gallery_images      text[]      DEFAULT '{}',
  services            text[]      DEFAULT '{}',
  is_featured         boolean     NOT NULL DEFAULT false,
  is_verified         boolean     NOT NULL DEFAULT false,
  is_pending          boolean     NOT NULL DEFAULT false,
  verification_status text        NOT NULL DEFAULT 'unverified',
  verified_at         timestamptz,
  submitted_at        timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_is_pending    ON profiles(is_pending);
CREATE INDEX IF NOT EXISTS idx_profiles_category_slug ON profiles(category_slug);
CREATE INDEX IF NOT EXISTS idx_profiles_location      ON profiles(location);
CREATE INDEX IF NOT EXISTS idx_profiles_slug          ON profiles(slug);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id          text        PRIMARY KEY,
  name        text        NOT NULL,
  slug        text        NOT NULL UNIQUE,
  description text        NOT NULL DEFAULT '',
  icon        text        NOT NULL DEFAULT '',
  color       text        NOT NULL DEFAULT 'blue',
  count       integer     DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Locations
CREATE TABLE IF NOT EXISTS locations (
  id            text        PRIMARY KEY,
  name          text        NOT NULL,
  slug          text        NOT NULL UNIQUE,
  parent_region text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Useful Contacts (emergency services, institutions)
CREATE TABLE IF NOT EXISTS contacts (
  id              text        PRIMARY KEY,
  title           text        NOT NULL,
  category        text        NOT NULL DEFAULT '',
  phone           text        NOT NULL,
  secondary_phone text,
  address         text,
  notes           text,
  icon            text        NOT NULL DEFAULT '',
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Recommendation Articles
CREATE TABLE IF NOT EXISTS articles (
  id                  text        PRIMARY KEY,
  title               text        NOT NULL,
  slug                text        NOT NULL UNIQUE,
  excerpt             text        NOT NULL DEFAULT '',
  content             text        NOT NULL DEFAULT '',
  image_url           text        NOT NULL DEFAULT '',
  related_profile_ids text[]      DEFAULT '{}',
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- ============================================================
-- Row Level Security
-- All writes go through service role key (API functions).
-- Public read is open — this is a public business directory.
-- ============================================================

ALTER TABLE profiles   ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations  ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles   ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first (safe to re-run)
DROP POLICY IF EXISTS "Public read profiles"   ON profiles;
DROP POLICY IF EXISTS "Public read categories" ON categories;
DROP POLICY IF EXISTS "Public read locations"  ON locations;
DROP POLICY IF EXISTS "Public read contacts"   ON contacts;
DROP POLICY IF EXISTS "Public read articles"   ON articles;

CREATE POLICY "Public read profiles"   ON profiles   FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read locations"  ON locations  FOR SELECT USING (true);
CREATE POLICY "Public read contacts"   ON contacts   FOR SELECT USING (true);
CREATE POLICY "Public read articles"   ON articles   FOR SELECT USING (true);
