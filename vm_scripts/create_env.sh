nvm install node
nvm use node
sudo apt install npm

echo "
------------------------------------------
	Cloning Git Repo
------------------------------------------"
cd /root/bmt-lg/api
npm install
npm install pm2 -g

cd /root/bmt-lg/app
npm install
npm run build

echo "
------------------------------------------
	Installing NGINX
------------------------------------------"
sudo apt install -y nginx
sudo rm /etc/nginx/sites-enabled/default
sudo sh /root/bmt-lg/vm_scripts/create_site_file.sh

sudo ln -s /etc/nginx/sites-available/bmt-db-front-end /etc/nginx/sites-enabled/bmt-db-front-end

echo "
------------------------------------------
	Creating SSL Certs
------------------------------------------"



echo "
---------------------------------------------------------
	Configuring Firewall (SSH, HTTP, HTTPS, NGINX
---------------------------------------------------------"
sudo ufw allow https
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow 'Nginx Full'
sudo ufw enable

echo "
---------------------------------------------------------
	Starting Servers
---------------------------------------------------------"
sudo service nginx start

echo "
---------------------------------------
	Restarting NGINX
---------------------------------------"
sudo service nginx restart

echo "
---------------------------------------
	Run Cert Bot
---------------------------------------"
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
