#!/bin/bash

magicmirror_dir=magicmirror

# Install magic mirror
echo
echo "Cloning Magicmirror."
git clone https://github.com/MichMich/MagicMirror.git --depth 1 $magicmirror_dir 2> /dev/null || echo "Skipping: Repo already cloned"

cd $magicmirror_dir

echo
echo "Installing magicmirror dependencies..."

npm install &> /dev/null

cp -a ../magicmirror-files/* ../$magicmirror/

cd - > /dev/null
echo "done."

sonos_module_dir=$magicmirror_dir/modules/MMM-Sonos
cd $sonos_module_dir

echo
echo "Installing Sonos/Cast module dependencies..."
npm install &> /dev/null
echo "done."

cd - > /dev/null

echo "Finishing up."
