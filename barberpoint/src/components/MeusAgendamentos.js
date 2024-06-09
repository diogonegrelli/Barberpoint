import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Importar ícone de lixeira
import './MeusAgendamentos.css';

function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const clienteId = localStorage.getItem("clienteId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!clienteId) {
      navigate('/login');
      return;
    }
    fetchAgendamentos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clienteId, navigate]);

  const fetchAgendamentos = async () => {
    try {
      const response = await fetch(`/agendamentos/cliente/${clienteId}`);
      if (!response.ok) throw new Error('Erro ao buscar agendamentos');
      const data = await response.json();
      setAgendamentos(data);
    } catch (error) {
      console.error('Falha ao buscar agendamentos:', error);
    }
  };

  const handleNavigateHome = () => {
    navigate('/'); // Função para navegar para a Home
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja cancelar o agendamento?')) {
      try {
        const response = await fetch(`/agendamentos/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao deletar agendamento');
        setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== id));
        setMensagem('Agendamento cancelado com sucesso.');
        setTimeout(() => {
          setMensagem('');
        }, 3000);
      } catch (error) {
        console.error('Falha ao deletar agendamento:', error);
      }
    }
  };

  return (
    <div className="agendamentos-container">
      <h2>Meus Agendamentos</h2>
      {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}
      <button onClick={handleNavigateHome} style={{ marginBottom: '10px', marginRight: '10px' }}>Voltar</button>
      <Link to="/agendar" className="action-btn">Novo Agendamento</Link>
      <div className="agendamentos-list">
        {agendamentos.map(agendamento => (
          <div key={agendamento.id} className="agendamento-card">
            <h4>Barbeiro: {agendamento.barbeiro.nome} {agendamento.barbeiro.sobrenome}</h4>
            <p>Data e Hora: {new Date(agendamento.dataHoraInicio).toLocaleString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            <p>Serviço: {agendamento.servico}</p>
            <button className="icon-button delete-button" onClick={() => handleDelete(agendamento.id)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeusAgendamentos;
