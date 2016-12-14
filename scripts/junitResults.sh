#!/bin/bash

set -e

mkdir -p junitResults
npm run test-noconsole

exit 0
