#!/bin/bash

echo -----------------------   Make backup downloadable from browser  -----------------------
# 
#       To be run from Mongo APP server 51.255.46.214
# 
#       Actions: 
#       - Copy latest db and files from the backup folder to a folder publicly available through the FO server
# 
#       Results: they are available here:
#       - https://frozengem.com/public-backup/files.tar.gz
#       - https://frozengem.com/public-backup/db.tar.gz
#
#       Should put this script in crontab for automatic running
#       but the running time should be after the backup time: 8, 18
# "         0 7,19 * * * /home/lve/make_backup_downloadable.sh &>> /home/lve/make_backup_downloadable.log "
# "         @reboot sleep 160 && /home/lve/make_backup_downloadable.sh &>> /home/lve/make_backup_downloadable.log "
# 

echo Create folder if does not exist yet. Generates an OK error if it already exists.
mkdir ~/workspace/frozengem/build/frozenbackup

echo Copy latest db and files from the backup folder to a folder publicly available through the FO server
cp -p "`ls -frt1 ~/frozengem_files_backup/* | tail -n 1`" ~/workspace/frozengem/build/frozenbackup/files.tar.gz
cp -p "`ls -frt1 ~/frozengem_db_backup/* | tail -n 1`" ~/workspace/frozengem/build/frozenbackup/db.tar.gz

echo Content of the public folder:
ls -flrth  ~/workspace/frozengem/build/frozenbackup

# notes on ls options:
# -f: remove colore
# -rt: sort by reverse time --> newest last 
# -1: 1 result per line
# -h: (with -l): human readable --> kb, mb...

# notes on tail options:
# -n 1: displays only the last line

