-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- PROFILES table
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  trading_experience text,
  preferred_markets text[],
  subscription_status text default 'free',
  stripe_customer_id text,
  razorpay_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TRADE_ENTRIES table
create table if not exists trade_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  symbol text not null,
  instrument_type text, -- Crypto, Forex, Stocks, etc.
  entry_price numeric not null,
  exit_price numeric,
  timeframe text,
  setup_type text,
  risk_reward_ratio numeric,
  result text check (result in ('win', 'loss', 'breakeven')),
  pnl numeric,
  screenshot_urls text[],
  pre_trade_reflection text,
  post_trade_reflection text,
  emotions text[], -- e.g. ['confident', 'anxious']
  mistakes text[],
  lessons text[],
  strategy_notes text,
  trade_date timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- AI_INSIGHTS table
create table if not exists ai_insights (
  id uuid default uuid_generate_v4() primary key,
  trade_id uuid references trade_entries on delete cascade,
  user_id uuid references auth.users on delete cascade,
  summary text,
  mistake_analysis text,
  emotional_analysis text,
  lessons_learned text,
  improvement_suggestions text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SUBSCRIPTIONS table
create table if not exists subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  plan_id text not null,
  status text not null,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PAYMENTS table
create table if not exists payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  amount numeric not null,
  currency text not null,
  status text not null,
  provider text not null, -- 'stripe' or 'razorpay'
  provider_payment_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table trade_entries enable row level security;
alter table ai_insights enable row level security;
alter table subscriptions enable row level security;
alter table payments enable row level security;

-- Policies for Profiles
drop policy if exists "Users can view own profile" on profiles;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Policies for Trade Entries (Allow Public Access for USP)
drop policy if exists "Users can view own trades" on trade_entries;
create policy "Users can view own trades" on trade_entries for select using (true);

drop policy if exists "Users can insert own trades" on trade_entries;
create policy "Users can insert own trades" on trade_entries for insert with check (true);

drop policy if exists "Users can update own trades" on trade_entries;
create policy "Users can update own trades" on trade_entries for update using (true);

drop policy if exists "Users can delete own trades" on trade_entries;
create policy "Users can delete own trades" on trade_entries for delete using (true);

-- Policies for AI Insights
drop policy if exists "Users can view own insights" on ai_insights;
create policy "Users can view own insights" on ai_insights for select using (auth.uid() = user_id);

-- Policies for Subscriptions
drop policy if exists "Users can view own subscriptions" on subscriptions;
create policy "Users can view own subscriptions" on subscriptions for select using (auth.uid() = user_id);

-- Policies for Payments
drop policy if exists "Users can view own payments" on payments;
create policy "Users can view own payments" on payments for select using (auth.uid() = user_id);

-- Function to handle new user profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
