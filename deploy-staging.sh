#!/usr/bin/env bash
# deploy-staging.sh — runs on the staging server
# Usage: bash deploy-staging.sh
set -euo pipefail

DEPLOY_DIR="/home/akinolaking/apps/onenet-nextjs"
HTACCESS_TARGET="/home/akinolaking/domains/staging.onenetservers.net/public_html/.htaccess"
REPO="https://github.com/akinolaking/onenet-frontend.git"
BRANCH="main"
PM2_APP="onenet-staging"

echo "=== [1/6] Pulling latest code ==="
if [ -d "$DEPLOY_DIR/.git" ]; then
  git -C "$DEPLOY_DIR" fetch origin
  git -C "$DEPLOY_DIR" reset --hard "origin/$BRANCH"
else
  mkdir -p "$DEPLOY_DIR"
  git clone --depth=1 --branch "$BRANCH" "$REPO" "$DEPLOY_DIR"
fi

echo "=== [2/6] Installing dependencies ==="
cd "$DEPLOY_DIR"
npm ci --prefer-offline

echo "=== [3/6] Building Next.js (standalone) ==="
npm run build

echo "=== [4/6] Copying static assets into standalone ==="
cp -r .next/static .next/standalone/.next/static
cp -r public       .next/standalone/public

echo "=== [5/6] Applying .htaccess to staging docroot ==="
cp staging.htaccess "$HTACCESS_TARGET"

echo "=== [6/6] Restarting PM2 app ==="
export DEPLOY_CWD="$DEPLOY_DIR/.next/standalone"
if pm2 describe "$PM2_APP" > /dev/null 2>&1; then
  pm2 restart "$PM2_APP" --update-env
else
  pm2 start "$DEPLOY_DIR/ecosystem.config.cjs" --env production
fi
pm2 save

echo "=== Deploy complete. Next.js running on port 3001. ==="
