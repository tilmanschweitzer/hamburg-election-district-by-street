#!/bin/bash

#npm run build

gcloud storage cp dist/*.*  gs://hamburg-election-district-by-street-search/

gcloud storage rm gs://hamburg-election-district-by-street-search/assets/*

gcloud storage cp --gzip-local-all dist/assets/*.*  gs://hamburg-election-district-by-street-search/assets
