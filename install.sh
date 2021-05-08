#!/bin/bash


magicmirror_dir=magicmirror/

# Install magic mirror
git clone https://github.com/MichMich/MagicMirror.git $magicmirror_dir

cd $magicmirror_dir
npm install

cp -a ../magicmirror-files .

cd -
