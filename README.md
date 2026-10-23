# FLIX NET — Vercel Edition

Vercel-ready FLIX NET frontend and serverless API structure.

## Deploy
1. Create a GitHub repository.
2. Upload the contents of this folder.
3. Import the GitHub repository into Vercel.
4. Add the variables from `env/.env.example` under Vercel Project Settings → Environment Variables.
5. Redeploy.

## Paystack
Server-side initialization and verification endpoints are under:
- `/api/paystack/initialize`
- `/api/paystack/verify`
- `/api/paystack/webhook`

Keep `PAYSTACK_SECRET_KEY` server-side.

## Hotspot
The `/api/hotspot/activate` endpoint is intentionally an adapter boundary. Automatic Wi-Fi activation cannot safely be completed until the exact hotspot/router model and API are known. Do not claim live activation until that adapter is configured and tested.
