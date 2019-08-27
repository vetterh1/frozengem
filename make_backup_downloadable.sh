#!/bin/bash

echo 
echo 
echo 
echo -----------------------   Make backup downloadable from browser  -----------------------
echo 
echo       To be run from Mongo APP server 51.255.46.214
echo 
echo       Actions: 
echo       - Copy latest files and db backup to public folder
echo 
echo       Results: they are available here:
echo       - https://frozengem.com/public-backup/files.tar.gz
echo       - https://frozengem.com/public-backup/db.tar.gz
echo
echo       Should put this script in crontab for automatic running
echo       but the running time should be after the backup time: 8, 18
echo "         0 7,19 * * * /home/lve/make_backup_downloadable.sh &>> /home/lve/make_backup_downloadable.log "
echo "         @reboot sleep 160 && /home/lve/make_backup_downloadable.sh &>> /home/lve/make_backup_downloadable.log "
echo 
echo ---------------------------- Prepares Backup ----------------------------
echo 
echo 


mkdir ~/workspace/frozengem/build/frozenbackup
cp -p "`ls -dftr1 ~/frozengem_files_backup/* | tail -1`" ~/workspace/frozengem/build/frozenbackup/files.tar.gz
cp -p "`ls -dftr1 ~/frozengem_db_backup/* | tail -1`" ~/workspace/frozengem/build/frozenbackup/db.tar.gz