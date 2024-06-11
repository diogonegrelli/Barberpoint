import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Container, Form, Button } from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setError("Email inválido.");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        // Redirecionar para AdminHome se as credenciais forem de administrador
        if (email === 'admin@admin.com' && password === 'admin1') {
            navigate('/admin-home');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/clientes/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha: password }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Email ou senha inválidos.');
            }

            const cliente = await response.json();
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("clienteId", cliente.id); 
            localStorage.setItem("clienteNome", cliente.nome); // Armazenar o nome do cliente
            setSuccess('Login bem-sucedido!');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="container">
            <h2>Login</h2>
            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
            {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <Button type="submit" disabled={loading}>
                    {loading ? "Carregando..." : "Entrar"}
                </Button>
            </Form>
            <div className="link-container">
                Não tem uma conta? <Link to="/register">Cadastre-se</Link><br/>
                <Link to="/">Voltar para a página inicial</Link>
            </div>
        </Container>
    );
}

export default Login;
