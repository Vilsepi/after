#!/bin/bash

# This script syncs the current directory to S3 to be hosted as a static website

# Bash strict mode
set -euo pipefail

REGION="eu-west-1"
PROFILE="heap"
BUCKET="after.heap.fi"

PROFILE_ARGS="--profile $PROFILE --region $REGION"
SYNC_FILE_ARGS="s3://$BUCKET/ --exclude '*.map*' --exclude '*.gz'"

if [ $# -lt 1 ]
then
  echo "Simulating S3 sync, no changes are made"
  eval aws s3 sync dist $SYNC_FILE_ARGS $PROFILE_ARGS --dryrun
  echo "To deploy, re-execute with --doit"
else
  if [ $1 == "--doit" ]; then
    echo "Uploading assets"
    eval aws s3 sync dist $SYNC_FILE_ARGS $PROFILE_ARGS
  elif [ $1 == "--dozipped" ]; then
    echo "Uploading zipped assets"
    eval aws s3 cp dist/index.html s3://$BUCKET/index.html $PROFILE_ARGS
    eval aws s3 cp dist/error.html s3://$BUCKET/error.html $PROFILE_ARGS
    eval aws s3 cp dist/bundle.js.gz s3://$BUCKET/bundle.js --content-encoding gzip $PROFILE_ARGS
    eval aws s3 cp dist/vendor.bundle.js.gz s3://$BUCKET/vendor.bundle.js --content-encoding gzip $PROFILE_ARGS
  else
    echo "Unknown arguments. Either use no args to dryrun or use --doit to upload"
  fi
fi
