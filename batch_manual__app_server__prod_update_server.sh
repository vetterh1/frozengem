#!/bin/bash
# File name: batch_manual__app_server__prod_update_server.sh

filesBackupFolder=~/frozengem_files_backup
dbBackupFolder=~/frozengem_db_backup

echo " "
echo "*******************************************************************"
echo " "
# OLD - when FO queries where served by http-server or nodejs
# NEW - Served directly by nginx (need to restart nginx at the end of this script)
# echo "----------------------------------"
# echo "1 - Stop & delete server (in pm2)"
# echo " "
# pm2 stop foFrozen
# pm2 delete foFrozen

echo " "
echo "----------------------------------"
echo "2 - Git: fetch / pull, stash potential local changes"
echo " "
git fetch -a
git stash
git pull

echo " "
echo "----------------------------------"
echo "3 - Batches should be executable!"
echo " "
chmod 755 ./*.sh

echo " "
echo "----------------------------------"
echo "4 - If full update: delete node_modules and reinstall with npm"
echo " "
if [[ $1 == "full" ]]; then
    echo "Full update including'npm install'. To do a simple install, please remove the parameter 'full'"
    rm -fr node_modules
    rm package-lock.json
    npm install
else
  echo "Simple update, no 'npm install' was done. To do a full install, please add the parameter 'full'"
fi

echo " "
echo "----------------------------------"
echo "5 - Build the server"
echo " "
npm run build

echo " "
echo "----------------------------------"
echo "6 - Restart nginx (webserver for FrozenGem FO)"
echo " "
systemctl restart nginx

# OLD - when FO queries where served by http-server or nodejs
# echo "6 - Restart the server by adding it to pm2"
# echo " "
# pm2 start /usr/local/bin/http-server --name foFrozen  -- ./build -p 8060 --cors  --gzip -c31536000

echo " "
echo "----------------------------------"
echo "7 - Info on backup disk usage:"
echo " "
du -sh $filesBackupFolder
du -sh $dbBackupFolder
echo " "
echo "*******************************************************************"
echo " "
