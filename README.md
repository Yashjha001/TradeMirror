# TradeMirror - AI-Powered Trading Journal

TradeMirror is a production-ready SaaS application designed for traders to track their performance, analyze their psychology, and build discipline through AI-assisted journaling.

## Features

- **AI Journaling Assistant**: Analyze trade reflections for emotional patterns and mistakes.
- **Psychology Tracking**: Tag emotions and identify behavioral biases.
- **Advanced Analytics**: Interactive charts for PnL, win rate, and setup performance.
- **Journal Workspace**: Comprehensive trade logging with screenshots and lessons.
- **Secure Authentication**: Supabase-powered Auth with Google/GitHub OAuth support.
- **Soft Mirror Tech Dark Theme**: A premium, minimalist UI/UX designed for focus.
- **Admin Panel**: Manage users, subscriptions, and AI usage.

## Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, ShadCN UI.
- **State Management**: Zustand, TanStack Query.
- **Database & Auth**: Supabase (PostgreSQL).
- **Charts**: Recharts.
- **Animations**: Framer Motion.

## Getting Started

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a `.env` file based on `.env.example` and add your Supabase credentials.
4. **Database Setup**:
   Run the SQL provided in `supabase_schema.sql` in your Supabase SQL Editor.
5. **Run the development server**:
   ```bash
   npm run dev
   ```

## Deployment

The application is optimized for deployment on **Vercel** or **Netlify**. Ensure you set the environment variables in your deployment platform's settings.

## License

Production-ready SaaS Template.
