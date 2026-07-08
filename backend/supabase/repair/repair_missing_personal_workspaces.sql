-- Run after deploying the auth workspace foundation migration if existing
-- Supabase Auth users were created before the trigger existed.
select public.repair_missing_personal_workspaces();
