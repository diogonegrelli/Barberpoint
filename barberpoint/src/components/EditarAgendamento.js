import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Container, Form, Button } from 'react-bootstrap';
import './EditarAgendamento.css';

function EditarAgendamento() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [agendamento, setAgendamento] = useState(null);
    const [barbeiros, setBarbeiros] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
            if (!response.ok) throw new Error('Falha ao atualizar agendamento');
            setSuccess('Agendamento atualizado com sucesso!');
            setTimeout(() => {
                navigate('/admin-home');
            }, 2000);
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
        <Container className="container">
            <h2>Editar Agendamento</h2>
            {error && <Alert variant="danger" className="error">{error}</Alert>}
            {success && <Alert variant="success" className="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="barbeiro">
                    <Form.Label>Barbeiro</Form.Label>
                    <Form.Control 
                        as="select" 
                        name="barbeiro" 
                        value={agendamento.barbeiro.id} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Selecione um barbeiro</option>
                        {barbeiros.map((barbeiro) => (
                            <option key={barbeiro.id} value={barbeiro.id}>
                                {barbeiro.nome} {barbeiro.sobrenome}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="dataHoraInicio">
                    <Form.Label>Data e Hora</Form.Label>
                    <Form.Control
                        type="text"
                        name="dataHoraInicio"
                        value={new Date(agendamento.dataHoraInicio).toLocaleString()}
                        disabled
                    />
                </Form.Group>
                <Form.Group controlId="cliente">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control
                        type="text"
                        name="cliente"
                        value={agendamento.cliente.nome}
                        disabled
                    />
                </Form.Group>
                <Button type="submit">Salvar Alterações</Button>
                <Button variant="secondary" onClick={handleNavigateHome} style={{ marginTop: '10px' }}>Painel</Button>
            </Form>
        </Container>
    );
}

export default EditarAgendamento;
