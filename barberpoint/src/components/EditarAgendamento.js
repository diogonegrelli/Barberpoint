import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarAgendamento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agendamento, setAgendamento] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAgendamento();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAgendamento = async () => {
    try {
      const response = await fetch(`/agendamentos/${id}`);
      if (!response.ok) throw new Error('Agendamento não encontrado');
      const data = await response.json();
      setAgendamento(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgendamento((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/agendamentos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agendamento),
      });
      if (!response.ok) throw new Error('Erro ao atualizar agendamento');
      alert('Agendamento atualizado com sucesso!');
      navigate('/admin-home');
    } catch (error) {
      setError(error.message);
    }
  };

  if (!agendamento) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <h2>Editar Agendamento</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Barbeiro:
          <input type="text" name="barbeiro" value={agendamento.barbeiro.nome} onChange={handleChange} required />
        </label>
        <label>
          Data e Hora:
          <input type="datetime-local" name="dataHoraInicio" value={agendamento.dataHoraInicio} onChange={handleChange} required />
        </label>
        <label>
          Serviço:
          <input type="text" name="servico" value={agendamento.servico} onChange={handleChange} required />
        </label>
        <label>
          Cliente:
          <input type="text" name="cliente" value={agendamento.cliente.nome} onChange={handleChange} required />
        </label>
        <label>
          Telefone:
          <input type="tel" name="telefone" value={agendamento.cliente.telefone} onChange={handleChange} required />
        </label>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarAgendamento;
