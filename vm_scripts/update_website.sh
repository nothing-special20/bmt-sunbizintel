cd /etc/nginx
sudo rm sites-available/bmt-db-front-end
sudo rm sites-enabled/bmt-db-front-end

sudo cp -r * /opt/app/dist/

sudo sh -c "echo '
server {
    listen 80;
    server_name ppploandata.io;
    return 301 https://\$host\$request_uri;
}

server {
    listen      443 ssl default_server;
    server_name ppploandata.io;

    ssl_certificate /etc/letsencrypt/live/ppploandata.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ppploandata.io/privkey.pem;

    location / {
        root /opt/app/dist;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }

    location /api/ {
        proxy_redirect                      off;
		proxy_set_header Access-Control_Allow-Origin *;
        proxy_set_header Host               \$host;
        proxy_set_header X-Real-IP          \$remote_addr;
        proxy_set_header X-Forwarded-For    \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  \$scheme;
        proxy_pass http://localhost:3000/;
    }

    error_log  /var/log/nginx/vue-app-error.log;
    access_log /var/log/nginx/vue-app-access.log;
}' >> /etc/nginx/sites-available/bmt-db-front-end"

sudo ln -s /etc/nginx/sites-available/bmt-db-front-end /etc/nginx/sites-enabled/bmt-db-front-end
