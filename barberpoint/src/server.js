const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001; // Porta do servidor Express

app.use(cors());
app.use(express.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'carmem100',
    database: 'barberpoint',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// CRUD para Clientes
app.get('/clientes', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar clientes.');
        }
        res.status(200).json(results);
    });
});

app.post('/cliente', (req, res) => {
    const { nome, sobrenome, email, telefone } = req.body;
    db.query('INSERT INTO clientes (nome, sobrenome, email, telefone) VALUES (?, ?, ?, ?)', 
    [nome, sobrenome, email, telefone], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao adicionar cliente.');
        }
        res.status(201).send({ message: 'Cliente adicionado com sucesso.', id: result.insertId });
    });
});

app.put('/cliente/:id', (req, res) => {
    const { nome, sobrenome, email, telefone } = req.body;
    db.query('UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, telefone = ? WHERE idCliente = ?', 
    [nome, sobrenome, email, telefone, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar cliente.');
        }
        res.status(200).send({ message: 'Cliente atualizado com sucesso.' });
    });
});

app.delete('/cliente/:id', (req, res) => {
    db.query('DELETE FROM clientes WHERE idCliente = ?', [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao deletar cliente.');
        }
        res.status(200).send({ message: 'Cliente deletado com sucesso.' });
    });
});

// CRUD para Agendamentos
app.get('/agendamentos', (req, res) => {
    db.query('SELECT agendamentos.*, clientes.nome AS clienteNome, barbeiros.nome AS barbeiroNome, servicos.nomeServico FROM agendamentos JOIN clientes ON agendamentos.idCliente = clientes.idCliente JOIN barbeiros ON agendamentos.idBarbeiro = barbeiros.idBarbeiro JOIN servicos ON agendamentos.idServico = servicos.idServico', (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao buscar agendamentos.');
        }
        res.status(200).json(results);
    });
});

app.post('/agendamento', (req, res) => {
    const { idCliente, idBarbeiro, dataHora, idServico } = req.body;
    db.query('INSERT INTO agendamentos (idCliente, idBarbeiro, dataHora, idServico) VALUES (?, ?, ?, ?)', 
    [idCliente, idBarbeiro, dataHora, idServico], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao criar agendamento.');
        }
        res.status(201).send({ message: 'Agendamento criado com sucesso.', id: result.insertId });
    });
});

app.put('/agendamento/:id', (req, res) => {
    const { idCliente, idBarbeiro, dataHora, idServico } = req.body;
    db.query('UPDATE agendamentos SET idCliente = ?, idBarbeiro = ?, dataHora = ?, idServico = ? WHERE idAgendamento = ?', 
    [idCliente, idBarbeiro, dataHora, idServico, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar agendamento.');
        }
        res.status(200).send({ message: 'Agendamento atualizado com sucesso.' });
    });
});

app.delete('/agendamento/:id', (req, res) => {
    db.query('DELETE FROM agendamentos WHERE idAgendamento = ?', [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send('Erro ao deletar agendamento.');
        }
        res.status(200).send({ message: 'Agendamento deletado com sucesso.' });
    });
});

// Inicializando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
