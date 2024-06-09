import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
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
import AdminHome from './components/AdminHome';
import EditarAgendamento from './components/EditarAgendamento';
import MeusAgendamentos from './components/MeusAgendamentos'; // Importar o novo componente
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
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/editar-agendamento/:id" element={<EditarAgendamento />} />
        <Route path="/meus-agendamentos" element={<MeusAgendamentos />} /> {/* Nova rota para Meus Agendamentos */}
      </Routes>
    </Router>
  );
}

export default App;
