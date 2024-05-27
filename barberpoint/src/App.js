// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Agendamento from "./components/Agendamento"; 
import GerenciarClientes from "./components/GerenciarClientes";
import EditarCliente from "./components/EditarCliente";
import CadastroBarbeiro from "./components/CadastroBarbeiro";
import GerenciarBarbeiros from "./components/GerenciarBarbeiros";
import EditarBarbeiro from "./components/EditarBarbeiro";
import AgendamentoBarbeiro from './components/AgendamentoBarbeiro';
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
        <Route path="/cadastro-barbeiro" element={<CadastroBarbeiro />} />
        <Route path="/gerenciar-barbeiros" element={<GerenciarBarbeiros />} />
        <Route path="/editar-barbeiro/:idBarbeiro" element={<EditarBarbeiro />} />
        <Route path="/agendamentos" element={<AgendamentoBarbeiro />} />
      </Routes>
    </Router>
  );
}

export default App;
