#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Testacular Server "
echo "-------------------------------------------------------------------"

# testacular start $BASE_DIR/testacular.conf.js $*
testacular start testacular.conf.js
