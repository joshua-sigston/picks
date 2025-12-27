-- Create a table for public profiles linked to auth.users
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  team_name text,
  email text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This triggers a function every time a new user signs up
-- to replicate the user data to the profiles table
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a table for weekly picks
create table picks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  week integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Game Pick
  game_pick text not null,
  
  -- Bonus Picks
  bonus_most_points text,
  bonus_least_points text,
  bonus_most_field_goals text,
  bonus_longest_field_goals text,
  bonus_lowest_victory_margin text,
  bonus_largest_victory_margin text,
  bonus_most_yards text,
  bonus_fewest_yards text,
  bonus_most_forced_turnovers text,
  bonus_most_passing_yards text,
  bonus_most_rushing_yards text,
  bonus_special_teams_touchdowns text,
  bonus_most_pick_6s text,
  bonus_passing_touchdowns text,
  bonus_rushing_touchdowns text,

  -- Ensure valid week range (1-18)
  constraint valid_week check (week >= 1 and week <= 18),

  -- Ensure one pick per user per week
  unique(user_id, week)
);

-- Set up RLS for picks
alter table picks enable row level security;

create policy "Users can view their own picks." on picks
  for select using (auth.uid() = user_id);

create policy "Users can insert their own picks." on picks
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own picks." on picks
  for update using (auth.uid() = user_id);
