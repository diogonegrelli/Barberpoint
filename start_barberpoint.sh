#!/bin/bash

# Verifica se o serviço MySQL está em execução
if systemctl is-active --quiet mysql; then
    echo "MySQL está em execução."
else
    echo "MySQL está parado. Iniciando o serviço..."
    sudo service mysql start
    echo "MySQL iniciado."
fi
cd barberpoint

npm install

cd ..

mvn spring-boot:run &

cd barberpoint

npm run dev 

npm start



