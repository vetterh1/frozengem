pm2 stop foFrozen
pm2 delete foFrozen
git fetch -a
git stash
git pull
chmod 755 ./prod_update_server.sh
rm -fr build
if [[ $1 == "full" ]]; then
    echo "Full update including'npm install'. To do a simple install, please remove the parameter 'full'"
    rm -fr node_modules
    rm package-lock.json
    npm install
else
  echo "Simple update, no 'npm install' was done. To do a full install, please add the parameter 'full'"
fi
npm run build
pm2 start /usr/local/bin/http-server --name foFrozen  -- ./build -p 8060 --cors  --proxy http://localhost:8060? --gzip -c2592000
# pm2 start npm  --name foFrozen  --env production -- run prodstart

# Info on backups:
echo " "
echo " "
echo "*******************************************************************"
echo "Backup disk usage:"
du -sh ~/frozengem_files_backup/
du -sh ~/frozengem_db_backup/
echo "*******************************************************************"
echo " "
echo " "

# Make backup downloadable from browser:
echo "Copy latest files & db backup to public folder"
echo "available here: "
echo "https://frozengem.com/public-backup/files.tar.gz"
echo "https://frozengem.com/public-backup/db.tar.gz"
mkdir ~/workspace/frozengem/build/frozenbackup
cp -p "`ls -dftr1 ~/frozengem_files_backup/* | tail -1`" ~/workspace/frozengem/build/frozenbackup/files.tar.gz
cp -p "`ls -dftr1 ~/frozengem_db_backup/* | tail -1`" ~/workspace/frozengem/build/frozenbackup/db.tar.gz