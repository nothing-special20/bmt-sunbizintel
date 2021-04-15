cd /root/bmt-sunbizintel
npm install

echo "
---------------------------------------------------------
        Deploying APP & API
---------------------------------------------------------"
cd /root/bmt-sunbizintel/app
npm install
npm run build

sudo cp -r ./dist/ /opt/app/

cd ../api
npm install
cd ..
sudo cp -r . /opt/

echo "
------------------------------------------
	Installing NGINX
------------------------------------------"
sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-available/bmt-db-front-end
sudo rm /etc/nginx/sites-enabled/bmt-db-front-end

sudo sh /root/bmt-sunbizintel/vm_scripts/create_site_file.sh

sudo ln -s /etc/nginx/sites-available/bmt-db-front-end /etc/nginx/sites-enabled/bmt-db-front-end

echo "
----------------------------------------
	Restarting PM2
----------------------------------------"
cd /opt/api
pm2 stop api
pm2 start /opt/api/ecosystem.config.js --env production

echo "
---------------------------------------------------------
	Configuring Firewall (SSH, HTTP, HTTPS, NGINX
---------------------------------------------------------"
sudo ufw allow https
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow 3000
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
