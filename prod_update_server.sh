pm2 stop foFrozen
pm2 delete foFrozen
git fetch -a
git stash
git pull
chmod 755 ./prod_update_server.sh
rm -fr node_modules
rm package-lock.json
npm install
npm run build
# pm2 start /usr/local/bin/http-server --name foFrozen  -- ./build -p 8060 --cors
pm2 start npm  --name foFrozen  --env production -- run prodstart
