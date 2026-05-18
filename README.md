# Cloud Catalog

A static-first, read-only web app for discovering cloud services (SaaS, PaaS, IaaS). Built with Next.js App Router, Tailwind CSS, Zustand, Fuse.js, and Supabase.

## Features

- **Global fuzzy search** (debounced) across name, description, tags, and vendor
- **Filters** for category, tags, and vendor
- **Service cards** with logo, category badge, description, and tags
- **Curated groups** (e.g. “Alternatives to Snowflake”, “Best Monitoring Tools”)
- **SPA-like UX** with server-rendered catalog data and client-side interactivity
- **No authentication** — public read-only Supabase RLS policies

## Quick start

```bash
cd cloud-catalog
npm install
cp .env.example .env.local   # optional — uses demo data without Supabase
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor.
3. Run `supabase/seed.sql` to load sample services and groups.
4. Copy your project URL and anon key into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set the same `NEXT_PUBLIC_*` environment variables.
4. Deploy — Next.js is detected automatically.

`revalidate = 3600` on the home page caches catalog data for one hour while keeping search/filters fully client-side.

## Stack

| Layer        | Choice              |
| ------------ | ------------------- |
| Framework    | Next.js 15 (App Router) |
| Language     | TypeScript          |
| Styling      | Tailwind CSS 4      |
| State        | Zustand             |
| Search       | Fuse.js             |
| Backend      | Supabase (Postgres) |
| Deployment   | Vercel              |
