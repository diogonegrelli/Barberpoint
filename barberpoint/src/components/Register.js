import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

      alert("Cadastrado com sucesso!");
      navigate('/');
    } catch (error) {
      setError("Erro ao cadastrar usuário. Tente novamente.");
      console.error("Erro ao fazer o cadastro:", error);
    }
  };

  return (
    <div className="container register">
      <h2>Cadastro</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      <div className="link-container">
        Já tem uma conta? <Link to="/login">Entrar</Link>
      </div>
    </div>
  );
}

export default Register;
