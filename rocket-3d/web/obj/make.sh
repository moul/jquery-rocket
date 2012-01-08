#!/bin/sh

DEST=rocket3d_full.js
echo "[" >> $DEST
cat rocket3d.js >> $DEST
echo "," >> $DEST
cat rocket3d_flame.js >> $DEST
echo "]" >> $DEST
