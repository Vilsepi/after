#!/bin/bash
#
# This script invokes an AWS Lambda function and outputs its result to the
# console. Requires AWS CLI tools and credentials configured.

# Usage: ./invoke.sh myAWSLambdaFunctionName
aws lambda invoke --function-name $1 /dev/stdout