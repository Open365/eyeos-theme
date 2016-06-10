#!/bin/sh
set -e
set -u

npm install
grunt commit-stage
