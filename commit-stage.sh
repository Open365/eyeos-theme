#!/bin/sh
set -e
set -u

npm install
npm install -g grunt-cli istanbul bower
# set git user/config if not previously set
if ! git config user.name > /dev/null
then
	git config --global user.name jenkins
	git config --global user.email jenkins@eyeos.com
fi
grunt commit-stage
