# EventGarde Supabase Setup

Supabase is intentionally kept inside `backend/supabase` so database migrations live with the backend API.

## One-time setup

1. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Log in to Supabase:

   ```bash
   npm run supabase -- login
   ```

3. Link this folder to your hosted Supabase project:

   ```bash
   npm run supabase:link -- --project-ref YOUR_PROJECT_REF
   ```

   The CLI may ask for the remote database password.

4. Copy backend env values from Supabase Project Settings:

   ```bash
   cp .env.example .env
   ```

   Fill:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `FRONTEND_URL`
   - `API_BASE_URL`
   - `CORS_ORIGIN`

5. Copy frontend env:

   ```bash
   cd ../frontend
   cp .env.example .env
   ```

## Apply migrations

From `backend`:

```bash
npm run supabase:db:push:dry
npm run supabase:db:push
```

After pushing migrations, older auth users can be repaired with:

```sql
select public.repair_missing_personal_workspaces();
```

## Google OAuth

In the Supabase dashboard, enable Google under Authentication providers.

Use this callback URL in Google/Supabase provider settings:

```text
http://localhost:4000/api/auth/callback
```

For production, add the production API callback URL as well.

## Local Supabase

Docker is required for the local Supabase stack.

```bash
cd backend
npm run supabase:start
npm run supabase:status
npm run supabase:db:reset
```

Generate database types after local reset or remote linking:

```bash
npm run supabase:types:local
# or
npm run supabase:types:linked
```
