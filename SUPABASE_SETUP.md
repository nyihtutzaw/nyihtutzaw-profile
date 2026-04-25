# Supabase Setup Guide

This guide will help you set up Supabase for your dynamic portfolio website.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Project name**: `portfolio` (or any name you prefer)
   - **Database password**: Choose a strong password (save this!)
   - **Region**: Choose the closest to your users
4. Click "Create new project" and wait for it to be ready

## Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## Step 3: Set Up Environment Variables

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Fill in your values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

## Step 4: Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase/schema.sql`
4. Click "Run" to execute
5. You should see "Success. No rows returned"

## Step 5: Set Up Storage

1. In the SQL Editor, create a new query
2. Copy and paste the contents of `supabase/storage.sql`
3. Click "Run" to execute

Alternatively, you can set up storage manually:
1. Go to **Storage** in your Supabase dashboard
2. Click "New bucket"
3. Name it `portfolio-images`
4. Check "Public bucket"
5. Click "Create bucket"

## Step 6: Seed the Database

1. In the SQL Editor, create a new query
2. Copy and paste the contents of `supabase/seed.sql`
3. Click "Run" to execute
4. This will populate your database with your existing portfolio data

## Step 7: Install Dependencies

Run the following command to install Supabase packages:

```bash
yarn add @supabase/supabase-js @supabase/ssr
```

Or with npm:
```bash
npm install @supabase/supabase-js @supabase/ssr
```

## Step 8: Migrate Images (Optional)

If you want to migrate your local images to Supabase Storage:

1. Install tsx for running TypeScript:
   ```bash
   yarn add -D tsx
   ```

2. Run the migration script:
   ```bash
   npx tsx scripts/migrate-images.ts
   ```

This will upload all images from your `/public` folder to Supabase Storage and update the database URLs.

## Step 9: Create an Admin User

1. In your Supabase dashboard, go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Enter your email and password
4. Click "Create user"
5. (Optional) Confirm the email if email confirmation is enabled

Now you can log in to the admin dashboard at `/admin/login`

## Step 10: Start the Development Server

```bash
yarn dev
```

Visit:
- `http://localhost:3000` - Your portfolio
- `http://localhost:3000/admin` - Admin dashboard

## Troubleshooting

### "Invalid API key" error
- Make sure your `.env.local` file has the correct keys
- Restart your development server after changing environment variables

### "Permission denied" errors
- Check that RLS policies are correctly set up
- Make sure you're logged in for admin operations

### Images not loading
- Verify the storage bucket is public
- Check that storage policies are correctly set up
- Run the image migration script if images are still local

### Admin login not working
- Make sure you created a user in Supabase Authentication
- Check that the email/password is correct
- Verify the user is confirmed (if email confirmation is enabled)

## File Structure

```
├── src/
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts      # Browser client
│   │       ├── server.ts      # Server client
│   │       └── middleware.ts  # Auth middleware
│   ├── types/
│   │   └── database.ts        # TypeScript types
│   ├── components/
│   │   └── admin/             # Admin dashboard components
│   └── app/
│       └── admin/             # Admin routes
├── supabase/
│   ├── schema.sql             # Database schema
│   ├── storage.sql            # Storage setup
│   └── seed.sql               # Initial data
└── scripts/
    └── migrate-images.ts      # Image migration script
```

## Security Notes

- Never commit `.env.local` to version control
- The `service_role` key has full database access - keep it secret
- RLS policies ensure public users can only read data
- Only authenticated users can modify data through the admin dashboard

## Deployment

When deploying to Vercel or other platforms:

1. Add the environment variables in your hosting platform's settings
2. Make sure to use the production Supabase URL and keys
3. The database and storage are already hosted by Supabase

## Support

If you encounter issues:
1. Check the Supabase logs in your dashboard
2. Check the browser console for errors
3. Verify all environment variables are set correctly
