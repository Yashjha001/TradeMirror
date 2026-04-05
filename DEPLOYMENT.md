# Deployment Guide for TradeMirror

TradeMirror is built with modern technologies and is easy to deploy to various cloud providers.

## Frontend Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository** to Vercel.
2. **Configure environment variables**:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Project Anon Key.
   - `VITE_OPENAI_API_KEY`: Your OpenAI API Key (for AI analysis).
   - `VITE_STRIPE_PUBLISHABLE_KEY`: Your Stripe Publishable Key.
3. **Build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy!**

### Netlify

1. **Link your repository** to Netlify.
2. **Add environment variables** in the Netlify UI.
3. **Build settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
4. **Deploy!**

## Database & Auth Setup (Supabase)

1. **Create a new project** in Supabase.
2. **Execute the SQL Schema**:
   Copy the content of `supabase_schema.sql` and run it in the **SQL Editor** of your Supabase project.
3. **Enable Auth Providers**:
   In the **Authentication** settings, enable **Email/Password** and optionally **Google/GitHub OAuth**.
4. **Storage Bucket**:
   Create a public bucket named `trade-screenshots` for trade images.
5. **Row Level Security (RLS)**:
   The SQL schema already includes RLS policies to ensure user data privacy.

## AI Processing Logic

The application is set up for **AI-powered analysis**. To fully enable this in production:

1. **Supabase Edge Functions**:
   Deploy an Edge Function to handle OpenAI API requests securely without exposing your API key in the frontend.
2. **Webhook Integration**:
   Use **n8n** or **Zapier** to trigger AI analysis workflows when a new trade is logged.

## Payments & Monetization

1. **Stripe/Razorpay Integration**:
   Configure your payment provider in the settings and use the provided billing logic in `Settings.tsx` to handle subscriptions.
2. **Webhooks**:
   Set up webhooks to update the `profiles` table when a subscription status changes.

## Security Best Practices

- Always use **Row Level Security** (RLS) in Supabase.
- Use **Environment Variables** for sensitive keys.
- Keep your dependencies updated.
- Implement **Rate Limiting** on your AI API calls.

## Support

For any deployment issues, please refer to the documentation of the respective cloud providers.
