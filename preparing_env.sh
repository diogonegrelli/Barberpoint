#!/bin/bash

echo "LEMBRE-SE DE MUDAR A SENHA DO ROOT DO MYSQL PARA carmem100"

# Instala o Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instala o npm
sudo apt-get install -y npm

# Instala o Maven
sudo apt-get install -y maven

# Define o PATH do Maven
export PATH=$PATH:/usr/share/maven/bin

# Baixa e instala o Java JDK 22
mkdir -p ~/java
cd ~/java
wget https://download.oracle.com/java/22/latest/jdk-22_linux-x64_bin.tar.gz
tar -xvf jdk-22_linux-x64_bin.tar.gz
rm jdk-22_linux-x64_bin.tar.gz

# Define o JAVA_HOME
export JAVA_HOME=~/java/jdk-22

# Atualiza o PATH para incluir o Java
export PATH=$PATH:$JAVA_HOME/bin

# Adiciona as variáveis de ambiente ao seu arquivo .bashrc para persistência
echo "export PATH=\$PATH:/usr/share/maven/bin:$JAVA_HOME/bin" >> ~/.bashrc
echo "export JAVA_HOME=$JAVA_HOME" >> ~/.bashrc

# Atualiza as variáveis de ambiente
echo "Configuração concluída. Por favor, reinicie o terminal ou execute 'source ~/.bashrc' para aplicar as alterações."


echo "----------------------Rode o seguinte comando para inicializar o banco de dados--------------------"
echo "\n -------------------lembre-se de que vc necessita estar dentro do projeto Barberpoint------------"
echo "\n---------------------------- a senha para acesso ao banco carmem100------------------------------------"
echo "\n"
echo "\n mysql -u root -p barberpoint  < database.sql"