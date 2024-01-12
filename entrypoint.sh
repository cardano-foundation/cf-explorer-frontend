#!/bin/bash
export REACT_APP_VERSION=$(grep -m 1 "version" package.json | awk '{print $2}' | sed 's/[",]//g')
envsubst <env.global.tmp.js >/usr/share/nginx/html/assets/env.global.js
mv /usr/share/nginx/html/index.html /usr/share/nginx/html/index.html.bak
sed -e 's|%REACT_APP_JSD_WIDGET_KEY%|'"$REACT_APP_JSD_WIDGET_KEY"'|g' /usr/share/nginx/html/index.html.bak >/usr/share/nginx/html/index.html
nginx -g 'daemon off;'
