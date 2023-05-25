# Jokelan lomamökit

## Setup (dev)

fill .env.local-file with following:

```env
# contentful creds
CONTENTFUL_SPACE=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=

// Secret for content preview (https://app.contentful.com/spaces/<CONTENTFUL_SPACE>/settings/content_preview)
DRAFT_SECRET=

# App's origin (f.e. http://localhost:3000)
NEXT_PUBLIC_ORIGIN=

# https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

# Sheets ID from URL
GOOGLE_SHEETS_ID=
```

- `pnpm i`
- `pnpm dev`

## Prod setup

- Vercel
  - Add Deploy hook and paste it to contentful's web hooks
  - add this also to github secrets (`DEPLOY_HOOK`)
  - Ignored Build Step -> `bash ignored-build-step.sh` - deploys only main branch
  - Setup Function Region
  - Add environment variables
  - Add install command: `pnpm i --prod --ignore-scripts`
- Contentful
  - Content preview URL (https://app.contentful.com/spaces/<CONTENT_SPACE>/settings/content_preview)
    - <SITE_ORIGIN>/api/draft?secret=<DRAFT_SECRET>&path={entry_field.path}
