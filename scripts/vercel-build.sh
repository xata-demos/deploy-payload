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

  # The Xata/Vercel integrations run independently, so a preview build can
  # start a few seconds before its database branch is visible to the CLI.
  max_branch_wait_attempts=30
  branch_wait_retry_delay=2

  for ((attempt = 1; attempt <= max_branch_wait_attempts; attempt++)); do
    if branch_wait_output="$(
      xata branch wait-ready "$preview_branch" --wake 2>&1
    )"; then
      if [[ -n "$branch_wait_output" ]]; then
        printf '%s\n' "$branch_wait_output"
      fi
      break
    fi

    if [[ "$branch_wait_output" != *"Invalid branch:"* ]]; then
      printf '%s\n' "$branch_wait_output" >&2
      exit 1
    fi

    if ((attempt == max_branch_wait_attempts)); then
      printf '%s\n' "$branch_wait_output" >&2
      printf 'Timed out waiting for Xata branch %q to become available.\n' "$preview_branch" >&2
      exit 1
    fi

    printf 'Xata branch %q is not available yet (attempt %d/%d); retrying in %ds...\n' \
      "$preview_branch" "$attempt" "$max_branch_wait_attempts" "$branch_wait_retry_delay"
    sleep "$branch_wait_retry_delay"
  done

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
