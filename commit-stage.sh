#!/bin/bash
set -e
set -u
set -x

npm install
node src/test/index.js
