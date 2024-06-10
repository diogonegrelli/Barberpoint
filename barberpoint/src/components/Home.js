import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Home.css'; 

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [clienteNome, setClienteNome] = useState('');

  useEffect(() => {
    const nome = localStorage.getItem('clienteNome');
    if (nome) {
      setClienteNome(nome);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("clienteId");
    localStorage.removeItem("clienteNome");
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="header-content">
          <h1>BarberPoint</h1>
          {isLoggedIn ? (
            <Link to="/meus-agendamentos" className="header-btn">Meus Agendamentos</Link>
          ) : (
            <Link to="/login" ></Link>
          )}
          {isLoggedIn ? (
            <div className="user-actions">
              <span>Bem vindo(a), {clienteNome}</span>
              <button onClick={handleLogout} style={{ marginLeft: '10px' }}className="header-btn">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="header-btn">Login</Link>
          )}
        </div>
      </div>
      <div className="main-content">
        <h2>Bem-vindo à BarberPoint</h2>
        <p>Agende seu horário de forma fácil e rápida!</p>
        <p>O controle dos seus serviços aqui.</p>
        {isLoggedIn && (
          <div className="action-container">
            <Link to="/agendar" className="action-btn">Agende seu horário</Link>
          </div>
        )}
      </div>
      <div className="footer">
        Desenvolvido por @Equipe11
      </div>
    </div>
  );
}

export default Home;
