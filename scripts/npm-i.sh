#!/usr/bin/bash
cd $1
if [ ! -d ./node_modules ]; then
  npm i
fi
npm run start
