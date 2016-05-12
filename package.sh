#!/bin/sh

set -e
set -u
set -x

BUILDDIR="./build-browser"
PKGDIR="pkgs"

bower install

if [ -d "$BUILDDIR" ]; then
    rm -rf $BUILDDIR
fi

if [ -d "$PKGDIR" ]; then
    rm -rf $PKGDIR
fi

mkdir $PKGDIR
mkdir $BUILDDIR

cp -r ./src/lib/* $BUILDDIR

tar -czvf pkgs/eyeosThemeBrowserArtifact.tar.gz $BUILDDIR bower.json
