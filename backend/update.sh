#!/bin/bash
#
# This script packages and uploads the source code of a AWS Lambda function and
# deploys it live. Requires AWS CLI tools and credentials configured.

if [ -n "$2" ]
then
  FUNCTION_FILE_NAME=$1
  FUNCTION_ARN_NAME=$2

  mkdir -p build
  cd $1
  zip -FSr ../build/$1.zip .
  cd ..
  aws lambda update-function-code --function-name $2 --zip-file fileb://build/$1.zip
else
	echo "Usage: ./update.sh checkins-dynamo myLambdaFunctionInAWS"
fi
