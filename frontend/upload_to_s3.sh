#!/bin/sh

# This script syncs the current directory to S3 to be hosted as a static website

aws s3 sync dist s3://beta.after.heap.fi/ --profile heap --region eu-west-1 --exclude "*.map*" --exclude "*.gz" --delete --dryrun
