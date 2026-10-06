-- ============================================================
-- Create the first admin login: admin@swanidhi.com
-- Supabase Dashboard → SQL Editor → New query → paste → Run.
--
-- 1) Replace CHANGE_ME_TO_A_STRONG_PASSWORD below with your own
--    password (min. 8 characters) before running.
-- 2) Safe to run again: if the user already exists, its password is
--    updated and it is (re)confirmed.
-- 3) Can be run before or after setup.sql / crm_setup.sql. If those
--    tables already exist, website-admin and CRM-admin access is
--    granted here too; otherwise those files grant it when you run them.
-- ============================================================
do $$
declare
  v_email    text := 'admin@swanidhi.com';
  v_password text := 'CHANGE_ME_TO_A_STRONG_PASSWORD';   -- ← your password
  v_name     text := 'Swanidhi Admin';
  v_user_id  uuid;
begin
  if v_password = 'CHANGE_ME_TO_A_STRONG_PASSWORD' or length(v_password) < 8 then
    raise exception 'Set your own password (min. 8 characters) in v_password before running.';
  end if;

  select id into v_user_id from auth.users where lower(email) = lower(v_email);

  if v_user_id is null then
    v_user_id := gen_random_uuid();

    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      -- GoTrue expects these to be empty strings, not NULL
      confirmation_token, recovery_token, email_change, email_change_token_new
    ) values (
      '00000000-0000-0000-0000-000000000000', v_user_id, 'authenticated', 'authenticated',
      v_email, extensions.crypt(v_password, extensions.gen_salt('bf')),
      now(), '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object('full_name', v_name),
      now(), now(),
      '', '', '', ''
    );

    insert into auth.identities (
      id, user_id, provider_id, provider, identity_data,
      last_sign_in_at, created_at, updated_at
    ) values (
      gen_random_uuid(), v_user_id, v_user_id::text, 'email',
      jsonb_build_object('sub', v_user_id::text, 'email', v_email, 'email_verified', true),
      now(), now(), now()
    );

    raise notice 'Created auth user % (%)', v_email, v_user_id;
  else
    update auth.users
       set encrypted_password = extensions.crypt(v_password, extensions.gen_salt('bf')),
           email_confirmed_at = coalesce(email_confirmed_at, now()),
           updated_at = now()
     where id = v_user_id;

    raise notice 'User % already existed — password updated', v_email;
  end if;

  -- Website admin panel (/admin) access — table created by setup.sql
  if to_regclass('public.admins') is not null then
    insert into public.admins (email) values (v_email) on conflict do nothing;
    raise notice 'Website admin access granted';
  end if;

  -- CRM admin (/crm) — table created by crm_setup.sql
  if to_regclass('public.profiles') is not null then
    insert into public.profiles (id, email, full_name, role, is_active)
    values (v_user_id, v_email, v_name, 'admin', true)
    on conflict (id) do update set role = 'admin', is_active = true;
    raise notice 'CRM admin profile granted';
  end if;
end $$;
