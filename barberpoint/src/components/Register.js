import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Container, Form, Button } from 'react-bootstrap';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("A senha deve conter no mínimo 8 caracteres, incluindo pelo menos um maiúsculo, um minúsculo, um número e um caractere especial.");
            return;
        }

        // Prepara o objeto do usuário para ser enviado
        const user = { nome: name, email, senha: password, sobrenome: "-", telefone: "(xx)99999-9999" };

        try {
            const response = await fetch('/clientes', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) throw new Error('Falha ao cadastrar usuário');

            setSuccess("Cadastrado com sucesso!");
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setError("Erro ao cadastrar usuário. Tente novamente.");
            console.error("Erro ao fazer o cadastro:", error);
        }
    };

    return (
        <Container className="container register">
            <h2>Cadastro</h2>
            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
            {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Control
                        type="text"
                        placeholder="Nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="birthDate">
                    <Form.Control
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit">Cadastrar</Button>
            </Form>
            <div className="link-container">
                Já tem uma conta? <Link to="/login">Entrar</Link>
            </div>
        </Container>
    );
}

export default Register;
