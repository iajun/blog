---
title: Nginx Conf for Wordpress
date: 2019-12-25 21:28:08
categories: wordpress
tags:
    - wordpress
    - nginx
---

## A basic configuration of my nginx for wordpress

```nginx
upstream blog {
    server 127.0.0.1:8042;
}


server {
    listen 80;
    server_name blog.jajun.top;
    return 302 https://blog.jajun.top;
}

server {
    listen 8042;
    server_name 127.0.0.1;

    root /www/blog;
    index index.php;

    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }

    location = /robots.txt {
        allow all;
        log_not_found off;
        access_log off;
    }

    error_page 404 403 /4xx.html;

    location = /4xx.html {
        root /www;
    }

    location = /wp-admin {
        return 302 https://blog.jajun.top/wp-admin/index.php;
    }

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include /usr/local/nginx/conf/fastcgi.conf;
        fastcgi_intercept_errors on;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires max;
        log_not_found off;
    }
}

server {
    listen 443 ssl;
    server_name blog.jajun.top;

    ssl on;
    ssl_certificate /usr/local/nginx/conf/cert/blog.pem;
    ssl_certificate_key /usr/local/nginx/conf/cert/blog.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_set_header Host $host;
        proxy_pass http://blog/;
    }
}
```

### try files

```nginx
try_files $uri $uri/ /index.php?\$args;
```

当 nginx 找不到 $root$uri 时，会寻找 $uri/ 文件 ，即 $root$uri/ ，再找不到时，会找 /index.php?$args

### 负载均衡

```nginx
upstream blog {
    server 127.0.0.1:8042;
}
```

对负债均衡，注意点配置 Host

```nginx
 proxy_set_header Host \$host;
```
