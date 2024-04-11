DROP DATABASE IF EXISTS barberpoint;
CREATE DATABASE barberpoint;
USE barberpoint;

SET @@global.time_zone = '+3:00';  -- Horário de São Paulo

/* Estrutura das tabelas */

-- Criação da tabela `clientes`
CREATE TABLE `clientes` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `sobrenome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255),
  `telefone` VARCHAR(20),
  `senha` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_cliente`)
);

-- Criação da tabela `barbeiros`
CREATE TABLE `barbeiros` (
  `idBarbeiro` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `sobrenome` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idBarbeiro`)
);

-- Criação da tabela `administradores`
CREATE TABLE `administradores` (
  `idAdmin` INT NOT NULL AUTO_INCREMENT,
  `nomeUsuario` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idAdmin`)
);

-- Criação da tabela `servicos`
CREATE TABLE `servicos` (
  `idServico` INT NOT NULL AUTO_INCREMENT,
  `nomeServico` VARCHAR(255) NOT NULL,
  `descricao` TEXT,
  `preco` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`idServico`)
);

-- Criação da tabela `agendamentos`
CREATE TABLE `agendamentos` (
  `idAgendamento` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `idBarbeiro` INT NOT NULL,
  `dataHora` DATETIME NOT NULL,
  `idServico` INT NOT NULL,
  PRIMARY KEY (`idAgendamento`),
  FOREIGN KEY (`id_cliente`) REFERENCES `clientes`(`id_cliente`),
  FOREIGN KEY (`idBarbeiro`) REFERENCES `barbeiros`(`idBarbeiro`),
  FOREIGN KEY (`idServico`) REFERENCES `servicos`(`idServico`)
);

/* Inserções iniciais */

-- Inserção de serviços exemplo
INSERT INTO `servicos` (`nomeServico`, `descricao`, `preco`) VALUES
('Corte', 'Corte de cabelo masculino', 30.00),
('Barba', 'Aparação e modelagem de barba', 20.00),
('Sobrancelha', 'Design de sobrancelha', 15.00);

-- Inserção de alguns barbeiros exemplo
INSERT INTO `barbeiros` (`nome`, `sobrenome`, `senha`) VALUES
('João', 'Silva', 'senha123'),
('Carlos', 'Santos', 'senha456');

-- Inserção de alguns clientes exemplo
INSERT INTO `clientes` (`nome`, `sobrenome`, `email`, `telefone`, `senha`) VALUES
('Pedro', 'Alvares', 'pedro@example.com', '999999999', 'senha789'),
('Luiz', 'Costa', 'luiz@example.com', '888888888', 'senha012');

