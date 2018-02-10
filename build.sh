#!/bin/sh
cd `dirname $0`
cd ./functions
npm run build
mv ./src/index.js ./index.js