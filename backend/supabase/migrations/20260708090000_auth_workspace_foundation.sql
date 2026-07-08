create extension if not exists pgcrypto;

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  workspace_type text not null,
  tier text not null,
  verification_status text not null,
  subscription_status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workspaces_workspace_type_check check (workspace_type in ('personal', 'business')),
  constraint workspaces_tier_check check (tier in ('free', 'starter', 'professional', 'enterprise')),
  constraint workspaces_verification_status_check check (verification_status in ('not_required', 'pending', 'verified', 'rejected')),
  constraint workspaces_subscription_status_check check (subscription_status in ('free', 'inactive', 'active', 'past_due', 'cancelled')),
  constraint workspaces_personal_defaults_check check (
    workspace_type <> 'personal'
    or (
      tier = 'free'
      and verification_status = 'not_required'
      and subscription_status = 'free'
    )
  ),
  constraint workspaces_business_tier_check check (
    workspace_type <> 'business'
    or tier in ('starter', 'professional', 'enterprise')
  )
);

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  email text,
  phone text,
  primary_intent text not null default 'attendee',
  default_workspace_id uuid references public.workspaces(id) on delete set null,
  terms_accepted_at timestamptz,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_profiles_primary_intent_check check (primary_intent in ('attendee', 'organizer', 'vendor'))
);

create table if not exists public.workspace_memberships (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workspace_memberships_role_check check (role in ('personal_owner', 'super_admin', 'admin', 'vendor_member')),
  constraint workspace_memberships_status_check check (status in ('active', 'invited', 'removed'))
);

create table if not exists public.user_verified_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  value_normalized text not null,
  verified_at timestamptz not null,
  source text,
  created_at timestamptz not null default now(),
  constraint user_verified_contacts_type_check check (type in ('email', 'phone'))
);

create unique index if not exists workspaces_one_personal_per_owner_idx
  on public.workspaces(owner_user_id)
  where workspace_type = 'personal';

create index if not exists workspaces_owner_user_id_idx
  on public.workspaces(owner_user_id);

create unique index if not exists workspace_memberships_workspace_user_idx
  on public.workspace_memberships(workspace_id, user_id);

create index if not exists workspace_memberships_user_status_idx
  on public.workspace_memberships(user_id, status);

create unique index if not exists user_verified_contacts_unique_idx
  on public.user_verified_contacts(user_id, type, value_normalized);

create index if not exists user_profiles_default_workspace_id_idx
  on public.user_profiles(default_workspace_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_workspaces_updated_at on public.workspaces;
create trigger set_workspaces_updated_at
  before update on public.workspaces
  for each row execute function public.set_updated_at();

drop trigger if exists set_user_profiles_updated_at on public.user_profiles;
create trigger set_user_profiles_updated_at
  before update on public.user_profiles
  for each row execute function public.set_updated_at();

drop trigger if exists set_workspace_memberships_updated_at on public.workspace_memberships;
create trigger set_workspace_memberships_updated_at
  before update on public.workspace_memberships
  for each row execute function public.set_updated_at();

create or replace function public.validate_workspace_membership_role()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  workspace_type_value text;
begin
  select workspace_type
    into workspace_type_value
    from public.workspaces
   where id = new.workspace_id;

  if workspace_type_value is null then
    raise exception 'Workspace does not exist for membership';
  end if;

  if workspace_type_value = 'personal' and new.role <> 'personal_owner' then
    raise exception 'Personal workspaces require personal_owner membership';
  end if;

  if workspace_type_value = 'business' and new.role = 'personal_owner' then
    raise exception 'Business workspaces cannot use personal_owner membership';
  end if;

  return new;
end;
$$;

drop trigger if exists validate_workspace_membership_role on public.workspace_memberships;
create trigger validate_workspace_membership_role
  before insert or update of workspace_id, role on public.workspace_memberships
  for each row execute function public.validate_workspace_membership_role();

alter table public.user_profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_memberships enable row level security;
alter table public.user_verified_contacts enable row level security;

drop policy if exists user_profiles_select_own on public.user_profiles;
create policy user_profiles_select_own on public.user_profiles
  for select to authenticated
  using ((select auth.uid()) = id);

drop policy if exists user_profiles_update_own on public.user_profiles;
create policy user_profiles_update_own on public.user_profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists workspaces_select_member on public.workspaces;
create policy workspaces_select_member on public.workspaces
  for select to authenticated
  using (
    owner_user_id = (select auth.uid())
    or exists (
      select 1
        from public.workspace_memberships membership
       where membership.workspace_id = public.workspaces.id
         and membership.user_id = (select auth.uid())
         and membership.status = 'active'
    )
  );

drop policy if exists workspace_memberships_select_own on public.workspace_memberships;
create policy workspace_memberships_select_own on public.workspace_memberships
  for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists user_verified_contacts_select_own on public.user_verified_contacts;
create policy user_verified_contacts_select_own on public.user_verified_contacts
  for select to authenticated
  using (user_id = (select auth.uid()));

grant select, update on public.user_profiles to authenticated;
grant select on public.workspaces to authenticated;
grant select on public.workspace_memberships to authenticated;
grant select on public.user_verified_contacts to authenticated;
