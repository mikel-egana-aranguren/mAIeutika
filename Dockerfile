FROM node:18
#COPY virtualhost/carshow.conf /etc/apache2/sites-available/carshow.conf
#COPY certificados /etc/apache2/sites-available
#RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
CMD npm install && ng serve --host 0.0.0.0 --open
