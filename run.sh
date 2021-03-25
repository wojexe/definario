#!/bin/sh
ls -d -1 /usr/share/nginx/html/js/* | xargs sed -i "s,##APIURL##,${API_URL},g"
nginx -g "daemon off;"