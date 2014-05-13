#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Testacular Server "
echo "-------------------------------------------------------------------"

# testacular start $BASE_DIR/testacular.conf.js $*
node_modules/testacular/bin/testacular start testacular.conf.js
