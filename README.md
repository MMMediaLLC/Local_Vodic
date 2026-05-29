<div align="center">
  <img width="1200" height="475" alt="GPRESS Локален водич" src="https://i.ibb.co/N2HH5Vwy/mmedia1.jpg" />
</div>

# GPRESS Локален водич

Модерна локална страница за фирми, услуги, продавници, институции и корисни контакти од Гостивар и Полог.

## Содржина

- категории
- профили на субјекти
- контакт информации
- работно време
- локација
- фотографии
- форма за испраќање податоци

## URL

https://vodic.gpress.mk

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite 6, TypeScript, Tailwind CSS v4, React Router v7 |
| API | Vercel Serverless Functions (`/api`) |
| Database | Supabase (Postgres) |
| Email forms | Web3Forms |
| Hosting | Vercel |

## Where data lives

All profiles, categories, locations, contacts and articles are stored in **Supabase**.
Tables: `profiles`, `categories`, `locations`, `contacts`, `articles`

## How to run locally

```bash
cp .env.example .env.local
# Fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY, ADMIN_PASSWORD

npm install
npm run dev        # requires: npm i -g vercel
```

## How to deploy

Push to `main` → Vercel auto-deploys.

**Required environment variables in Vercel dashboard:**
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`
- `ADMIN_PASSWORD`

**Build settings:** Build command: `vite build` · Output directory: `dist` · Framework: Other/Vite

**Domain:** add `vodic.gostivarpress.mk` → DNS CNAME → `cname.vercel-dns.com`

## Database setup

Run the SQL migrations in order in the Supabase SQL Editor:

1. `supabase/migrations/0001_initial_schema.sql` — tables + RLS (public read)
2. `supabase/migrations/0002_add_is_active.sql` — `is_active` column
3. `supabase/migrations/0003_add_subcategory.sql` — `subcategory` column

To populate demo data, call the admin-only seed endpoint once:

```
POST /api/seed   (Authorization: Bearer <ADMIN_PASSWORD>)
```

## How it works

1. React SPA is built by Vite and served as static files from Vercel's CDN.
2. All `/api/*` requests go to Vercel Serverless Functions in the `/api` directory.
3. Functions read/write Supabase using the service role key (server-side only, never exposed to browser).
4. Admin auth is stateless: password verified per-request against `ADMIN_PASSWORD` env var.
5. Public submission form sends email via Web3Forms — no backend involvement.

---

Developed by M&M Media  
https://mmmedia.site
