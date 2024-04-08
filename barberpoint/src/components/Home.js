import React from "react";
import { Link, useNavigate } from "react-router-dom";
import barbershopImage from '../assets/images/barbershop.jpg'; 

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove o estado de login
    navigate('/login');
  };

  return (
    <div style={{ backgroundImage: `url(${barbershopImage})`, height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
      <div className="container" style={{ marginTop: '20vh' }}>
        <h2>Bem-vindo à BarberPoint</h2>
        <p>Agende seu horário de forma fácil e rápida!</p>
        <p>O controle dos seus serviços aqui.</p>
        {isLoggedIn && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/agendar" className="action-btn">Agende seu horário</Link>
          </div>
        )}
      </div>
      <div className="footer">
        Desenvolvido por @irvanlei
      </div>
    </div>
  );
}

export default Home;
