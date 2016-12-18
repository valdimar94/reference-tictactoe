#!/bin/bash

set -e
# creates directory if not exist
mkdir -p junitResults
#runs unit tests
npm run test-noconsole

exit 0
