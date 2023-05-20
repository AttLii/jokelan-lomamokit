# Jokelan lomamökit

## Setup (dev)

fill .env.local-file with following:

```env
# contentful creds
CONTENTFUL_SPACE=
CONTENTFUL_ACCESS_TOKEN=

# App's origin (f.e. http://localhost:3000)
NEXT_PUBLIC_ORIGIN=

# https://dashboard.hcaptcha.com/welcome
NEXT_PUBLIC_HCAPTCHA_SITE_KEY="10000000-ffff-ffff-ffff-000000000001"
HCAPTCHA_SECRET="0x0000000000000000000000000000000000000000"

# https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

# Sheets ID from URL
GOOGLE_SHEETS_ID=
```

- `pnpm i`
- `pnpm dev`

## Prod setup (Vercel)

Remember to:

- Add Deploy hook and paste it to contentful's web hooks
  - add this also to github secrets (`DEPLOY_HOOK`)
- Ignored Build Step -> `bash ignored-build-step.sh` - deploys only main branch
- Setup Function Region
- Add environment variables
- Add install command: `pnpm i --prod --ignore-scripts`
