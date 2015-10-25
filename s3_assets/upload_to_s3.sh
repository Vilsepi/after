#!/bin/sh

# This script uploads the current directory to S3 to be hosted as a static website

aws s3 cp . s3://after.heap.fi/ --profile heap --region eu-west-1 --recursive --exclude ".git/*"
