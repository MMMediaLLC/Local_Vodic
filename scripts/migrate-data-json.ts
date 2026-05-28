/**
 * One-off migration: reads data.json (or falls back to mockData.ts)
 * and upserts all records into Supabase.
 *
 * Run: npx tsx scripts/migrate-data-json.ts
 * Requires: .env.local with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load .env.local
config({ path: path.join(process.cwd(), '.env.local') });

const SUPABASE_URL              = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function loadSourceData() {
  const dataJsonPath = path.join(process.cwd(), 'data.json');
  if (fs.existsSync(dataJsonPath)) {
    console.log('📂  Reading data.json ...');
    return JSON.parse(fs.readFileSync(dataJsonPath, 'utf-8'));
  }
  console.log('📂  data.json not found — using mockData.ts as source ...');
  const { mockProfiles, mockCategories, mockLocations, mockContacts, mockArticles } =
    await import('../src/lib/mockData.js');
  return {
    profiles:   mockProfiles,
    categories: mockCategories,
    locations:  mockLocations,
    contacts:   mockContacts,
    articles:   mockArticles,
  };
}

async function upsertTable(table: string, rows: any[], label: string) {
  if (!rows?.length) {
    console.log(`  ⏭  ${label}: 0 records — skipping`);
    return;
  }
  const { error, count } = await supabase
    .from(table)
    .upsert(rows, { onConflict: 'id', ignoreDuplicates: false })
    .select('id', { count: 'exact', head: true });

  if (error) {
    console.error(`  ❌  ${label}: ${error.message}`);
  } else {
    console.log(`  ✅  ${label}: ${rows.length} records upserted`);
  }
}

function profileToDb(p: any) {
  return {
    id:                  String(p.id),
    name:                p.name               ?? '',
    slug:                p.slug               ?? '',
    category:            p.category           ?? '',
    category_slug:       p.categorySlug       ?? '',
    location:            p.location           ?? 'Гостивар',
    short_description:   p.shortDescription   ?? '',
    full_description:    p.fullDescription    ?? '',
    phone:               p.phone              ?? '',
    secondary_phone:     p.secondaryPhone     ?? null,
    email:               p.email              ?? null,
    website:             p.website            ?? null,
    facebook:            p.facebook           ?? null,
    instagram:           p.instagram          ?? null,
    address:             p.address            ?? '',
    working_hours:       p.workingHours       ?? null,
    google_maps_url:     p.googleMapsUrl      ?? null,
    logo:                p.logo               ?? null,
    logo_shape:          p.logoShape          ?? 'square',
    cover_image:         p.coverImage         ?? null,
    gallery_images:      p.galleryImages      ?? [],
    services:            p.services           ?? [],
    is_featured:         p.isFeatured         ?? false,
    is_verified:         p.isVerified         ?? false,
    is_pending:          p.isPending          ?? false,
    verification_status: p.verificationStatus ?? 'unverified',
    verified_at:         p.verifiedAt         ?? null,
    submitted_at:        p.submittedAt        ?? null,
  };
}

function categoryToDb(c: any) {
  return {
    id:          String(c.id),
    name:        c.name        ?? '',
    slug:        c.slug        ?? '',
    description: c.description ?? '',
    icon:        c.icon        ?? '',
    color:       c.color       ?? 'blue',
    count:       c.count       ?? 0,
  };
}

function locationToDb(l: any) {
  return {
    id:            String(l.id),
    name:          l.name         ?? '',
    slug:          l.slug         ?? '',
    parent_region: l.parentRegion ?? null,
  };
}

function contactToDb(c: any) {
  return {
    id:              String(c.id),
    title:           c.title           ?? '',
    category:        c.category        ?? '',
    phone:           c.phone           ?? '',
    secondary_phone: c.secondaryPhone  ?? null,
    address:         c.address         ?? null,
    notes:           c.notes           ?? null,
    icon:            c.icon            ?? '',
  };
}

function articleToDb(a: any) {
  return {
    id:                  String(a.id),
    title:               a.title               ?? '',
    slug:                a.slug                ?? '',
    excerpt:             a.excerpt             ?? '',
    content:             a.content             ?? '',
    image_url:           a.image_url           ?? '',
    related_profile_ids: a.related_profile_ids ?? [],
    created_at:          a.created_at          ?? new Date().toISOString(),
  };
}

async function main() {
  console.log('\n🚀  GPRESS Локален водич — Data Migration\n');

  const source = await loadSourceData();

  await upsertTable('profiles',   (source.profiles   ?? []).map(profileToDb),  'Profiles');
  await upsertTable('categories', (source.categories ?? []).map(categoryToDb), 'Categories');
  await upsertTable('locations',  (source.locations  ?? []).map(locationToDb), 'Locations');
  await upsertTable('contacts',   (source.contacts   ?? []).map(contactToDb),  'Contacts');
  await upsertTable('articles',   (source.articles   ?? []).map(articleToDb),  'Articles');

  console.log('\n✨  Migration complete. Check Supabase Table Editor to verify.\n');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
