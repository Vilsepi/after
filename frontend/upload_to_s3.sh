#!/bin/bash
# Uploads the current directory to S3 to be hosted as a static website

if [ "$1" == "--deploy" ]; then
  echo "Deploying to production"
  aws s3 cp . s3://after.heap.fi/ --profile heap --region eu-west-1 --recursive --exclude "data/*"
elif [ "$1" == "--deploy-dev" ]; then
  echo "Deploying to dev"
  aws s3 cp . s3://after.heap.fi/dev/ --profile heap --region eu-west-1 --recursive --exclude "data/*"
else
  echo "Dryrunning deployment. To deploy, add --deploy argument"
  aws s3 cp . s3://after.heap.fi/ --profile heap --region eu-west-1 --recursive --exclude "data/*" --dryrun
fi
