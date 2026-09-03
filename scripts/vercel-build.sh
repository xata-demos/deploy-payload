#!/usr/bin/env bash
set -euo pipefail

if [[ "${VERCEL_ENV:-}" == "preview" ]]; then
  : "${VERCEL_GIT_COMMIT_REF:?Missing VERCEL_GIT_COMMIT_REF}"
  : "${XATA_API_KEY:?Missing XATA_API_KEY}"
  : "${XATA_ORGANIZATION_ID:?Missing XATA_ORGANIZATION_ID}"
  : "${XATA_PROJECT_ID:?Missing XATA_PROJECT_ID}"

  if ! command -v xata >/dev/null 2>&1; then
    curl -fsSL https://xata.io/install.sh | bash
    export PATH="${HOME}/.config/xata/bin:${PATH}"
  fi

  preview_branch="${VERCEL_GIT_COMMIT_REF}"

  xata branch wait-ready "$preview_branch" --wake

  preview_database_url="$(
    xata branch url "$preview_branch" --type primary
  )"

  export DATABASE_URL="$preview_database_url"

  # Makes the dynamically resolved value available to the built Next.js app.
  umask 077
  printf 'DATABASE_URL=%s\n' "$DATABASE_URL" >> .env.production
fi

# Applies migrations to either the PR database or production main database.
pnpm payload migrate
pnpm build