#!/bin/bash

# This script syncs the current directory to S3 to be hosted as a static website

# Bash strict mode
set -euo pipefail

REGION="eu-west-1"
PROFILE="heap"
BUCKET="after.heap.fi"

SYNC_BASE_ARGS="s3://$BUCKET/ --profile $PROFILE --region $REGION"
SYNC_FILE_ARGS="--exclude '*.map*' --exclude '*.gz'"

if [ $# -lt 1 ]
then
  echo "Simulating S3 sync, no changes are made"
  eval aws s3 sync dist $SYNC_BASE_ARGS $SYNC_FILE_ARGS --dryrun
  echo "To deploy, re-execute with --doit"
else
  if [ $1 == "--doit" ]; then
    echo "Uploading assets"
    eval aws s3 sync dist $SYNC_BASE_ARGS $SYNC_FILE_ARGS
  else
    echo "Unknown arguments. Either use no args to dryrun or use --doit to upload"
  fi
fi
