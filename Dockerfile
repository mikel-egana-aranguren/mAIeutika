FROM node:18 AS frontend
WORKDIR /app/
COPY /frontend/ /app/
RUN npm install -g npm@latest && \
    npm install && \
    npm install -g @angular/cli && \
    ng serve --open

FROM python:3.8 AS backend
WORKDIR /app/
COPY /backend/ /app/
COPY /requirements.txt /requirements.txt
COPY .env /app/.env
RUN python -m venv venv && \
    . venv/bin/activate && \
    pip install -r /requirements.txt && \
    python /app/main.py
#RUN python -m venv venv && source venv/bin/activate && pip install -r /requirements.txt && python /app/main.py
#COPY virtualhost/carshow.conf /etc/apache2/sites-available/carshow.conf
#COPY certificados /etc/apache2/sites-available
#RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
