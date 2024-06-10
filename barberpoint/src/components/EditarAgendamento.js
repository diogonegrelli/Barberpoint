import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarAgendamento.css'; // Import the updated CSS file

function EditarAgendamento() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [agendamento, setAgendamento] = useState(null);
    const [barbeiros, setBarbeiros] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAgendamento();
        fetchBarbeiros();
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

    const fetchBarbeiros = async () => {
        try {
            const response = await fetch('/barbeiros');
            if (!response.ok) throw new Error('Falha ao buscar barbeiros');
            const data = await response.json();
            setBarbeiros(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setAgendamento((prevState) => ({
            ...prevState,
            barbeiro: { ...prevState.barbeiro, id: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedAgendamento = {
                ...agendamento,
                barbeiro: { id: agendamento.barbeiro.id }
            };
            const response = await fetch(`/agendamentos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAgendamento),
            });
            if (!response.ok) throw new Error('Erro ao atualizar agendamento');
            alert('Agendamento atualizado com sucesso!');
            navigate('/admin-home');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleNavigateHome = () => {
        navigate('/admin-home');
    };

    if (!agendamento) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container">
            <h2>Editar Agendamento</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Barbeiro:
                    <select name="barbeiro" value={agendamento.barbeiro.id} onChange={handleChange} required>
                        <option value="">Selecione um barbeiro</option>
                        {barbeiros.map((barbeiro) => (
                            <option key={barbeiro.id} value={barbeiro.id}>
                                {barbeiro.nome} {barbeiro.sobrenome}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Data e Hora:
                    <input
                        type="text"
                        name="dataHoraInicio"
                        value={new Date(agendamento.dataHoraInicio).toLocaleString()}
                        disabled
                    />
                </label>
                <label>
                    Cliente:
                    <input
                        type="text"
                        name="cliente"
                        value={agendamento.cliente.nome}
                        disabled
                    />
                </label>
                <button type="submit">Salvar Alterações</button>
                <button type="button" onClick={handleNavigateHome} style={{ marginTop: '10px' }}>Painel</button>
            </form>
        </div>
    );
}

export default EditarAgendamento;
