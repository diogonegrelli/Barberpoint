# BarberPoint

## Introdução

BarberPoint é uma aplicação web destinada a facilitar o gerenciamento de barbearias. A plataforma permite o cadastro e gerenciamento de barbeiros, clientes e agendamentos de serviços, visando a otimização dos processos dentro de uma barbearia.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Projeto](#configuração-do-projeto)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Utilização](#utilização)
- [Contribuições](#contribuições)

## Funcionalidades

- **Autenticação de Usuários:** Login e logout de usuários.
- **Gerenciamento de Barbeiros:** Inclusão, exclusão e edição de barbeiros.
- **Agendamento de Serviços:** Permite aos clientes agendar horários para diferentes tipos de serviços.
- **Visualização de Agendamentos:** Os administradores podem visualizar e gerenciar os agendamentos.

## Tecnologias Utilizadas

- **Frontend:** React
- **Backend:** Spring Boot
- **Banco de Dados:** MySQL
- **Autenticação:** JWT (JSON Web Tokens)

## Pré-requisitos

- Node.js
- npm ou yarn
- Java JDK 17 ou superior
- MySQL

## Configuração do Projeto

### Backend

- **Clonar o repositório do backend:** Execute `git clone <url-do-repositório-backend>` para obter o código-fonte.
- **Construir o projeto:** Acesse o diretório com `cd backend` e construa o projeto com `./mvnw clean install`.
- **Configurar o arquivo `application.properties`:** Ajuste as propriedades de conexão com o banco de dados adicionando as seguintes linhas:
  - spring.datasource.url=jdbc:mysql://localhost:3306/barberpoint
  - spring.datasource.username=<seu-usuario>
  - spring.datasource.password=<sua-senha>
- **Executar o projeto:** Inicie a aplicação com `./mvnw spring-boot:run`.

### Frontend

- **Clonar o repositório do frontend:** Execute `git clone <url-do-repositório-frontend>` para obter o código-fonte.
- **Instalar dependências:** Acesse o diretório com `cd frontend` e instale as dependências necessárias com `npm install`.
- **Iniciar o servidor de desenvolvimento:** Ative o servidor com `npm start`. A aplicação estará disponível em `http://localhost:3000`.

## Utilização

- Acesse a URL do frontend em `http://localhost:3000`. Utilize as credenciais de administrador para acessar o sistema e gerenciar barbeiros e agendamentos.

## Contribuições

- Contribuições são sempre bem-vindas! Crie um fork do repositório, submeta um Pull Request com suas melhorias ou abra Issues para discutir mudanças propostas.

