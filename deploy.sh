#!/bin/bash


# Old setup
# bucket_name="hamburg-election-district-by-street-search"
# bucket_domain="hamburg-election-district-by-street.tilmanschweitzer.de"

bucket_name="hamburg-election-district-by-street.tilmanschweitzer.de"
bucket_domain="${bucket_name}"

sed -i '' 's/Vite App/Hamburg Wahlbezirke 2025/g' dist/index.html

gcloud storage cp dist/*.*  "gs://${bucket_name}/"

gcloud storage rm "gs://${bucket_name}/assets/*"

gcloud storage cp --gzip-local-all dist/assets/*.*  "gs://${bucket_name}/assets"

commit_hash=$(git show HEAD~2 --pretty=format:"%h" --no-patch)
echo "Open https://storage.googleapis.com/${bucket_name}/index.html?hash=${commit_hash}"
echo "Open https://${bucket_domain}/?hash=${commit_hash}"
