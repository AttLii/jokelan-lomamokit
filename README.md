# Jokelan lomamökit

## Setup

fill .env-file with following:

```
# Contentful credentials
VITE_CONTENTFUL_SPACE=
VITE_CONTENTFUL_ACCESS_TOKEN=

# Canonical urls (f.e. https://client.com)
VITE_ORIGIN=

# Vercel Serverless function's origin
VITE_ENDPOINT_ORIGIN=

# Contact Form to google sheets
# https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

# Google sheet's id from URL (remember to share the sheet with service accounts email address)
GOOGLE_SHEETS_ID=
```

## Dev environment

- `pnpm i`
- fill `.env`-file with above information
  - note: VITE_ENDPOINT_ORIGIN should be by default `http://localhost:3000` (next command's port).
- `pnpm vercel dev` - starts server for vercel serverless functions
- `pnpm dev`

## TODO

- Disaster recovery solution
