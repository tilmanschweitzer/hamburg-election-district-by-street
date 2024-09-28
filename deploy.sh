#!/bin/bash

gcloud storage cp dist/*.*  gs://hamburg-election-district-by-street-search/

gcloud storage rm gs://hamburg-election-district-by-street-search/assets/*

gcloud storage cp --gzip-local-all dist/assets/*.*  gs://hamburg-election-district-by-street-search/assets

commit_hash=$(git show HEAD~2 --pretty=format:"%h" --no-patch)
echo "Open https://storage.googleapis.com/hamburg-election-district-by-street-search/index.html?hash=${commit_hash}"
