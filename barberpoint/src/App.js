// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Agendamento from "./components/Agendamento"; 
import GerenciarClientes from "./components/GerenciarClientes";
import EditarCliente from "./components/EditarCliente";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/agendar" element={<Agendamento />} /> 
        <Route path="/gerenciar-clientes" element={<GerenciarClientes />} />
        <Route path="/editar-cliente/:idCliente" element={<EditarCliente />} />
      </Routes>
    </Router>
  );
}

export default App;
