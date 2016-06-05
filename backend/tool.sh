#!/bin/bash
#
# bash strict mode
set -euo pipefail
IFS=$'\n\t'

USAGE="Usage:\n
Requires AWS CLI tools and credentials configured.\n
./tool.sh install mySourceDirectory\n
./tool.sh create mySourceDirectory myAWSLambdaFunctionName myIAMRoleARN\n
./tool.sh update mySourceDirectory myAWSLambdaFunctionName\n
./tool.sh invoke myAWSLambdaFunctionName\n
"

REGION="eu-west-1"
PROFILE="heap"

# Install pip requirements for a Python lambda
function install_requirements {
  FUNCTION_DIRECTORY=$2
  cd $FUNCTION_DIRECTORY
  pip install -r requirements.txt -t .
}

# Creates a new lambda function
function create {
  FUNCTION_DIRECTORY=$2
  FUNCTION_ARN_NAME=$3
  ROLE_ARN=$4

  mkdir -p build
  cd $FUNCTION_DIRECTORY
  zip -FSr ../build/$FUNCTION_DIRECTORY.zip .
  cd ..

  aws lambda create-function\
  --function-name $FUNCTION_ARN_NAME\
  --runtime python2.7\
  --role $4\
  --handler main.lambda_handler\
  --timeout 15\
  --memory-size 128\
  --zip-file fileb://build/$FUNCTION_DIRECTORY.zip
}

# Packages and uploads the source code of a AWS Lambda function and deploys it live.
function upload_lambda_source {
  FUNCTION_DIRECTORY=$2
  FUNCTION_ARN_NAME=$3

  mkdir -p build
  cd $FUNCTION_DIRECTORY
  zip -FSr ../build/$FUNCTION_DIRECTORY.zip .
  cd ..
  aws lambda update-function-code --profile $PROFILE --region $REGION --function-name $FUNCTION_ARN_NAME --zip-file fileb://build/$FUNCTION_DIRECTORY.zip
}

# Invokes an AWS Lambda function and outputs its result
function invoke {
  FUNCTION_ARN_NAME=$2
  aws lambda invoke --profile $PROFILE --region $REGION --function-name $FUNCTION_ARN_NAME /dev/stdout  
}


function help_and_exit {
  echo -e $USAGE
  exit 1
}

# Subcommand handling
if [ $# -lt 1 ]
then
  help_and_exit
fi

case "$1" in
  install)
    if (( $# == 2 )); then
      install_requirements "$@"
    else
      help_and_exit
    fi
    ;;
  create)
    if (( $# == 4 )); then
      create "$@"
    else
      help_and_exit
    fi
    ;;
  update)
    if (( $# == 3 )); then
      upload_lambda_source "$@"
    else
      help_and_exit
    fi
    ;;
  invoke)
    if (( $# == 2 )); then
      invoke "$@"
    else
      help_and_exit
    fi
    ;;
  *)
    echo "Error: No such subcommand"
    help_and_exit
esac
