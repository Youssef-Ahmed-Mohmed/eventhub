# eventshub

## Live Website

[https://eventhub-i5pg.vercel.app/](https://eventhub-i5pg.vercel.app/)

eventshub is a full-stack event platform for discovering events, reserving seats, completing checkout, managing QR tickets, and reviewing community event submissions.

## Highlights

- Event discovery with categories, event details, pricing, and live seat availability.
- Supabase Email + Password authentication, Google OAuth, and GitHub OAuth.
- Supabase-backed seat reservations that prevent duplicate reservations.
- Demo checkout, secure signed QR tickets, and organizer QR check-in.
- Personal ticket area for attendees.
- Community event submission and an admin approve/reject workflow.

## Tech Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS 4 and Framer Motion
- Supabase Auth, PostgreSQL, and Realtime
- JSON Web Tokens for QR ticket payloads

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env.local` from the example and fill in values from Supabase:

```bash
copy .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
QR_SECRET_KEY=use-a-long-random-secret
```

Never commit `.env.local` or the service-role key.

`NEXT_PUBLIC_SUPABASE_URL` must be the project URL (`https://<project-ref>.supabase.co`), without `/rest/v1`.

## Supabase Setup

In **Supabase Dashboard → SQL Editor**, run these files in order:

1. `supabase/schema.sql`
2. `supabase/migrations/20260918_event_submission.sql`
3. `supabase/migrations/20261002_profiles_and_account_deletion.sql`

Then start the application:

```bash
npm run dev
```

## Admin Access

Create a user through Supabase Auth, then promote that user's profile in the SQL Editor (replace the UUID with the user's Auth ID):

```sql
update public.profiles set role = 'admin' where id = '<auth user UUID>';
```

Use `organizer` for event hosts. Organizers can manage and check in tickets for their own events. Admins can review submissions at `/dashboard/events` and manage any event. Attendees can submit events for review.

## Supabase Auth Setup

### Email + Password

In **Supabase Dashboard > Authentication > Sign In / Providers > Email**, enable Email and password sign-in. Choose whether email confirmation is required. If enabled, configure email delivery and keep the app callback URLs below in the redirect allow list.

### GitHub OAuth

1. In **Supabase Dashboard > Authentication > Sign In / Providers > GitHub**, enable GitHub and copy the displayed **Callback URL**. It has this form:

   ```text
   https://<project-ref>.supabase.co/auth/v1/callback
   ```

2. Create a GitHub OAuth App in GitHub Developer Settings. Set its Homepage URL to your website. Set its **Authorization callback URL** to the Supabase Callback URL from step 1. Do not use your website's `/auth/callback` URL here.
3. Copy the GitHub Client ID and Client Secret into the Supabase GitHub provider settings, then save.

### Google OAuth

1. In **Supabase Dashboard > Authentication > Sign In / Providers > Google**, enable Google and copy the displayed **Callback URL**.
2. In Google Cloud Console, create or open the Web OAuth client. Add the Supabase Callback URL under **Authorized redirect URIs**.
3. Copy the Google Client ID and Client Secret into the Supabase Google provider settings, then save. Keep the secret in Supabase; do not add it to browser code or commit the downloaded credentials JSON.

### Supabase redirect URLs

In **Supabase Dashboard > Authentication > URL Configuration**, set Site URL to your production site and add these app callback URLs under Redirect URLs:

```text
http://localhost:3000/auth/callback
https://eventhub-i5pg.vercel.app/auth/callback
```

The app uses `/auth/callback` to exchange the Supabase Auth code for a session. Add any custom production domain there too. Supabase requires each `redirectTo` destination to match an allowed redirect URL.

## Payment Note

Checkout currently runs in demo mode: it confirms a reservation but does not charge a card. Before production, connect Paymob, Stripe, or another provider and verify payment webhooks before marking a seat as booked.

## Deployment (Vercel)

1. Import this GitHub repository into Vercel.
2. Set the Root Directory to `event-platform` if the repository has a parent folder.
3. Add every variable from `.env.example` in Vercel Project Settings → Environment Variables.
4. Add the production domain to Supabase Auth redirect URLs.
5. Deploy.

Before launch, configure GitHub OAuth, a real payment provider, and a strong production `QR_SECRET_KEY`.

## Validation

```bash
npx tsc --noEmit
npm run build
```

## Security

- Service-role Supabase access is server-only.
- QR tokens are signed using `QR_SECRET_KEY`.
- Ticket access is limited to its owner or an admin.
- Local secrets, dependencies, and build artifacts are excluded from Git.
