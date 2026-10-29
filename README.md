# FLIX NET — Vercel + Supabase + Paystack

Responsive paid Wi-Fi portal with customer accounts, package browsing, Paystack initialization and verification, signed webhooks, purchase history, voucher display, and an admin dashboard protected by Supabase row-level security.

## Before accepting real payments
This code can deploy to Vercel, but it is not production-live until Supabase, Paystack, and a reachable hotspot controller are configured and tested. The initial router adapter targets MikroTik RouterOS v7 REST. If your router is another brand, its adapter must be changed. Do not expose router administration directly to the public internet.

## Setup
1. Create a Supabase project and run supabase/schema.sql in its SQL Editor.
2. Copy the project URL, anon key, and service-role key from Supabase Settings > API.
3. Import this repo into Vercel. Framework preset: Other; leave build command and output directory blank.
4. Add variables from .env.example in Vercel Project Settings. Set SITE_URL to the exact deployed HTTPS URL, then redeploy.
5. Create an account on the site. Promote it to admin in Supabase SQL Editor: update public.profiles set role='admin' where id=(select id from auth.users where email='YOUR_EMAIL');
6. Use Paystack test keys first and set the webhook URL to https://YOUR_DOMAIN/api/paystack/webhook.
7. Configure and test the router before setting HOTSPOT_ENABLED=true.

## Environment variables
SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, PAYSTACK_SECRET_KEY, PAYSTACK_PUBLIC_KEY, SITE_URL, HOTSPOT_ENABLED, HOTSPOT_HOST, HOTSPOT_USERNAME, HOTSPOT_PASSWORD, HOTSPOT_PROFILE, ADMIN_PHONE, WHATSAPP_NUMBER.

Keep SUPABASE_SERVICE_ROLE_KEY and PAYSTACK_SECRET_KEY server-side only. Never commit a real .env file. The browser only receives the public Supabase URL and anon key through /api/config.

## Router
The initial adapter provisions MikroTik RouterOS v7 HotSpot users through HTTPS REST. The router must have a HotSpot server and the selected profile. Vercel cannot reach a router on a private LAN without a secure network/controller path. Use a VPN or dedicated secure agent, not open public router administration. Test with a low-value package first.

## Sample packages
The schema seeds KSh 20 / 1 hour, KSh 60 / 6 hours and KSh 100 / 24 hours as editable sample prices. Confirm your real prices before launch.
