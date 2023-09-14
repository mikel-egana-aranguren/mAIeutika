FROM php:7.2.2-apache
COPY virtualhost/carshow.conf /etc/apache2/sites-available/carshow.conf
COPY certificados /etc/apache2/sites-available
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli