#!/bin/bash
FAILS=0

while true
do
    sleep 0.5
    node main.js
    EXIT=$?
    ((FAILS++))

    if [[ $FAILS -gt 10 ]]
    then
        echo "[$(date)] failed 10 times..."
    fi

    echo "[$(date)] bot exited with code $EXIT. restarting ..."

done
