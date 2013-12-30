#!/bin/bash


CURRENT=`pwd`

rm -rf mobileclient
rm -rf builds
mop

echo "Removing extra stuff from builds to reduce apk size"
cd  builds/radio-player/packages
find . -name  "*[^d].js" -delete
find . -name  "*.md" -delete

cd $CURRENT
echo "Creating a cordova app, for more info see http://cordova.apache.org/docs/en/3.3.0/guide_cli_index.md.html#The%20Command-Line%20Interface"

cordova create mobileclient com.example.test.client TestClient
cd mobileclient
cordova platform add ios
cordova platform add android
cordova plugin add org.apache.cordova.console

cp www/config.xml .
cp -R ../builds/radio-player/* www/
cp config.xml www/

cordova build ios
./platforms/ios/cordova/run

cordova run android