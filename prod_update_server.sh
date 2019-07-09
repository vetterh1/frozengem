pm2 stop foFrozen
pm2 delete foFrozen
git fetch -a
git stash
git pull
chmod 755 ./prod_update_server.sh
if [[ $1 == "full" ]]; then
    echo "Full update including'npm install'. To do a simple install, please remove the parameter 'full'"
    rm -fr node_modules
    rm package-lock.json
    npm install
else
  echo "Simple update, no 'npm install' was done. To do a full install, please add the parameter 'full'"
fi
npm run build
pm2 start /usr/local/bin/http-server --name foFrozen  -- ./build -p 8060 --cors
# pm2 start npm  --name foFrozen  --env production -- run prodstart
