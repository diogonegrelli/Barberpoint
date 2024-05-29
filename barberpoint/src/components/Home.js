import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Home.css'; 

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove o estado de login
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="header-content">
          <h1>BarberPoint</h1>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="header-btn">Logout</button>
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
