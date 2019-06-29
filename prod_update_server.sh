pm2 stop foFrozen
pm2 delete foFrozen
git fetch -a
git stash
git pull
chmod 755 ./prod_update_server.sh
rm -fr node_modules
rm package-lock.json
npm install
NODE_ENV=production pm2 start npm -- run prod --name foFrozen  --env production
