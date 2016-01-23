#!/bin/bash
# Usage: ./invoke.sh myAWSLambdaFunctionName
aws lambda invoke --function-name $1 /dev/stdout
