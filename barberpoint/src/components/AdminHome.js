import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css'; // Importando o arquivo CSS
import { FaTrash, FaEdit } from 'react-icons/fa'; // Importando ícones

function AdminHome() {
  const [agendamentos, setAgendamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    try {
      const response = await fetch('/agendamentos');
      if (!response.ok) throw new Error('Erro ao buscar agendamentos');
      const data = await response.json();
      setAgendamentos(data);
    } catch (error) {
      console.error('Falha ao buscar agendamentos:', error);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleEdit = (id) => {
    navigate(`/editar-agendamento/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/agendamentos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar agendamento');
      setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== id));
    } catch (error) {
      console.error('Falha ao deletar agendamento:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Bem vindo, Administrador</h2>
      <button className="logout-button" onClick={handleLogout}>Sair</button>
      <div className="admin-menu">
        <button className="admin-button" onClick={() => handleNavigate('/gerenciar-clientes')}>Gerenciar Clientes</button>
        <button className="admin-button" onClick={() => handleNavigate('/gerenciar-barbeiros')}>Gerenciar Barbeiros</button>
        <button className="admin-button" onClick={() => handleNavigate('/cadastro-barbeiro')}>Cadastrar Barbeiro</button>
      </div>
      <h3 className="admin-subtitle">Agendamentos</h3>
      <div className="admin-agendamentos">
        {agendamentos.map(agendamento => (
          <div key={agendamento.id} className="admin-card">
            <h4>Barbeiro: {agendamento.barbeiro.nome} {agendamento.barbeiro.sobrenome}</h4>
            <p>Data e Hora: {new Date(agendamento.dataHoraInicio).toLocaleString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            <p>Serviço: {agendamento.servico}</p>
            <p>Cliente: {agendamento.cliente.nome} {agendamento.cliente.sobrenome}</p>
            <p>Telefone: {agendamento.cliente.telefone}</p>
            <div className="admin-card-actions">
              <button className="icon-button edit-button" onClick={() => handleEdit(agendamento.id)}><FaEdit /></button>
              <button className="icon-button delete-button" onClick={() => handleDelete(agendamento.id)}><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
