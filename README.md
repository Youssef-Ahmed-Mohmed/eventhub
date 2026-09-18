# NEXUS Events

## Live Website

[https://eventhub-i5pg.vercel.app/](https://eventhub-i5pg.vercel.app/)

NEXUS Events is a full-stack event platform for discovering events, reserving seats, completing checkout, managing QR tickets, and reviewing community event submissions.

## Highlights

- Event discovery with categories, event details, pricing, and live seat availability.
- Email/password authentication and ready-to-configure Google, Facebook, and Instagram/Meta OAuth.
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
ADMIN_EMAILS=admin@example.com
QR_SECRET_KEY=use-a-long-random-secret
```

Never commit `.env.local` or the service-role key.

## Supabase Setup

In **Supabase Dashboard → SQL Editor**, run these files in order:

1. `supabase/schema.sql`
2. `supabase/migrations/20260918_event_submission.sql`

Then start the application:

```bash
npm run dev
```

## Admin Access

Create a Supabase Auth user with an email in `ADMIN_EMAILS`, then sign in at `/admin/login`. Admins can use `/dashboard/events` to approve or reject submitted events.

## OAuth Setup

Enable Google and Facebook in **Supabase Dashboard → Authentication → Providers**. Add this callback URL in Supabase and in each provider configuration:

```text
https://your-domain.com/auth/callback
```

For local development also add:

```text
http://localhost:3000/auth/callback
```

Instagram login is configured through a Meta/Facebook app with `instagram_basic` and an Instagram Business or Creator account.

## Payment Note

Checkout currently runs in demo mode: it confirms a reservation but does not charge a card. Before production, connect Paymob, Stripe, or another provider and verify payment webhooks before marking a seat as booked.

## Deployment (Vercel)

1. Import this GitHub repository into Vercel.
2. Set the Root Directory to `event-platform` if the repository has a parent folder.
3. Add every variable from `.env.example` in Vercel Project Settings → Environment Variables.
4. Add the production domain to Supabase Auth redirect URLs.
5. Deploy.

Before launch, configure OAuth, a real payment provider, and a strong production `QR_SECRET_KEY`.

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
