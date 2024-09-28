#!/bin/bash

sed -i '' 's/Vite App/Hamburg Wahlbezirke 2025/g' dist/index.html

gcloud storage cp dist/*.*  gs://hamburg-election-district-by-street-search/

gcloud storage rm gs://hamburg-election-district-by-street-search/assets/*

gcloud storage cp --gzip-local-all dist/assets/*.*  gs://hamburg-election-district-by-street-search/assets

commit_hash=$(git show HEAD~2 --pretty=format:"%h" --no-patch)
echo "Open https://storage.googleapis.com/hamburg-election-district-by-street-search/?hash=${commit_hash}"
echo "Open https://hamburg-election-district-by-street.tilmanschweitzer.de/?hash=${commit_hash}"
