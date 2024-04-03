// src/components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      alert('Login bem-sucedido!');
      navigate('/');
    } else {
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
