import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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
            alert('Login bem-sucedido!');
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
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
                <button type="submit" disabled={loading}>
                    {loading ? "Carregando..." : "Entrar"}
                </button>
            </form>
            <div className="link-container">
                Não tem uma conta? <Link to="/register">Cadastre-se</Link><br/>
                <Link to="/">Voltar para a página inicial</Link>
            </div>
        </div>
    );
}

export default Login;
