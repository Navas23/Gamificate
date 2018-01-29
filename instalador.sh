#!/bin/sh
apt-get update && apt-get upgrade -y
apt-get install curl -y
apt-get install npm -y
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash
sudo apt-get install -y nodejs
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
apt-get update -y
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get install -y mongodb-org
sudo npm i
