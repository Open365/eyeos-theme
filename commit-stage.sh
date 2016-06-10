#!/bin/sh
set -e
set -u

npm install
npm install -g grunt-cli istanbul bower
grunt commit-stage
