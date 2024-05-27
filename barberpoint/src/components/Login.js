import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/clientes/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha: password }),
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // capturar mensagem de erro
                throw new Error(errorMessage || 'Email ou senha inválidos.');
            }

            const cliente = await response.json();
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("clienteId", cliente.id); 
            alert('Login bem-sucedido!');
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
            <div className="link-container">
                Não tem uma conta? <Link to="/register">Cadastre-se</Link><br/>
                <Link to="/">Voltar para a página inicial</Link>
            </div>
        </div>
    );
}

export default Login;
