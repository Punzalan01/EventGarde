create or replace function public.normalize_auth_primary_intent(raw_intent text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case
    when lower(coalesce(raw_intent, '')) in ('attendee', 'organizer', 'vendor')
      then lower(raw_intent)
    else 'attendee'
  end;
$$;

create or replace function public.ensure_auth_user_foundation(auth_user auth.users)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  profile_full_name text;
  profile_avatar_url text;
  profile_primary_intent text;
  profile_terms_accepted_at timestamptz;
  personal_workspace_id uuid;
  personal_workspace_name text;
begin
  profile_full_name := nullif(trim(coalesce(
    auth_user.raw_user_meta_data ->> 'full_name',
    auth_user.raw_user_meta_data ->> 'fullName',
    auth_user.raw_user_meta_data ->> 'name',
    ''
  )), '');

  profile_avatar_url := nullif(trim(coalesce(
    auth_user.raw_user_meta_data ->> 'avatar_url',
    auth_user.raw_user_meta_data ->> 'picture',
    ''
  )), '');

  profile_primary_intent := public.normalize_auth_primary_intent(
    coalesce(
      auth_user.raw_user_meta_data ->> 'primary_intent',
      auth_user.raw_user_meta_data ->> 'primaryIntent',
      auth_user.raw_user_meta_data ->> 'role'
    )
  );

  begin
    profile_terms_accepted_at := nullif(auth_user.raw_user_meta_data ->> 'terms_accepted_at', '')::timestamptz;
  exception when others then
    profile_terms_accepted_at := null;
  end;

  personal_workspace_name := case
    when profile_full_name is not null then profile_full_name || '''s Personal Workspace'
    else 'Personal Workspace'
  end;

  insert into public.user_profiles (
    id,
    full_name,
    avatar_url,
    email,
    phone,
    primary_intent,
    terms_accepted_at
  )
  values (
    auth_user.id,
    profile_full_name,
    profile_avatar_url,
    lower(auth_user.email),
    auth_user.phone,
    profile_primary_intent,
    profile_terms_accepted_at
  )
  on conflict (id) do update set
    full_name = coalesce(public.user_profiles.full_name, excluded.full_name),
    avatar_url = coalesce(public.user_profiles.avatar_url, excluded.avatar_url),
    email = coalesce(excluded.email, public.user_profiles.email),
    phone = coalesce(excluded.phone, public.user_profiles.phone),
    primary_intent = coalesce(public.user_profiles.primary_intent, excluded.primary_intent),
    terms_accepted_at = coalesce(public.user_profiles.terms_accepted_at, excluded.terms_accepted_at),
    updated_at = now();

  insert into public.workspaces (
    owner_user_id,
    name,
    workspace_type,
    tier,
    verification_status,
    subscription_status
  )
  values (
    auth_user.id,
    personal_workspace_name,
    'personal',
    'free',
    'not_required',
    'free'
  )
  on conflict (owner_user_id) where workspace_type = 'personal'
  do update set
    name = coalesce(public.workspaces.name, excluded.name),
    updated_at = now()
  returning id into personal_workspace_id;

  insert into public.workspace_memberships (
    workspace_id,
    user_id,
    role,
    status
  )
  values (
    personal_workspace_id,
    auth_user.id,
    'personal_owner',
    'active'
  )
  on conflict (workspace_id, user_id) do update set
    role = 'personal_owner',
    status = 'active',
    updated_at = now();

  update public.user_profiles
     set default_workspace_id = coalesce(default_workspace_id, personal_workspace_id),
         updated_at = now()
   where id = auth_user.id;

  if auth_user.email_confirmed_at is not null and auth_user.email is not null then
    insert into public.user_verified_contacts (
      user_id,
      type,
      value_normalized,
      verified_at,
      source
    )
    values (
      auth_user.id,
      'email',
      lower(auth_user.email),
      auth_user.email_confirmed_at,
      'supabase_auth'
    )
    on conflict (user_id, type, value_normalized) do update set
      verified_at = greatest(public.user_verified_contacts.verified_at, excluded.verified_at),
      source = excluded.source;
  end if;

  if auth_user.phone_confirmed_at is not null and auth_user.phone is not null then
    insert into public.user_verified_contacts (
      user_id,
      type,
      value_normalized,
      verified_at,
      source
    )
    values (
      auth_user.id,
      'phone',
      regexp_replace(auth_user.phone, '\s+', '', 'g'),
      auth_user.phone_confirmed_at,
      'supabase_auth'
    )
    on conflict (user_id, type, value_normalized) do update set
      verified_at = greatest(public.user_verified_contacts.verified_at, excluded.verified_at),
      source = excluded.source;
  end if;

  return personal_workspace_id;
end;
$$;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.ensure_auth_user_foundation(new);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_eventgarde on auth.users;
create trigger on_auth_user_created_eventgarde
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

create or replace function public.repair_missing_personal_workspaces(target_user_id uuid default null)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  repaired_count integer := 0;
  auth_user auth.users;
begin
  for auth_user in
    select *
      from auth.users
     where target_user_id is null or id = target_user_id
  loop
    perform public.ensure_auth_user_foundation(auth_user);
    repaired_count := repaired_count + 1;
  end loop;

  return repaired_count;
end;
$$;
