import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Container, Form, Button } from 'react-bootstrap';
import './EditarBarbeiro.css';

function EditarBarbeiro() {
    const { idBarbeiro } = useParams();
    const navigate = useNavigate();
    const [barbeiro, setBarbeiro] = useState({
        nome: '',
        sobrenome: '',
        senha: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchBarbeiro = async () => {
            try {
                const response = await fetch(`/barbeiros/${idBarbeiro}`);
                if (!response.ok) throw new Error('Falha ao buscar dados do barbeiro');
                const data = await response.json();
                setBarbeiro(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBarbeiro();
    }, [idBarbeiro]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBarbeiro(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/barbeiros/${idBarbeiro}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(barbeiro)
            });
            if (!response.ok) throw new Error('Falha ao atualizar barbeiro');
            setSuccess('Barbeiro atualizado com sucesso!');
            setTimeout(() => {
                navigate('/gerenciar-barbeiros');
            }, 2000);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">Erro: {error}</div>;

    return (
        <Container className="container">
            <h2>Editar Barbeiro</h2>
            {error && <Alert variant="danger" className="error">{error}</Alert>}
            {success && <Alert variant="success" className="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nome">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                        type="text"
                        name="nome"
                        value={barbeiro.nome}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="sobrenome">
                    <Form.Label>Sobrenome:</Form.Label>
                    <Form.Control
                        type="text"
                        name="sobrenome"
                        value={barbeiro.sobrenome}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="senha">
                    <Form.Label>Senha: (altere para mudar)</Form.Label>
                    <Form.Control
                        type="password"
                        name="senha"
                        value={barbeiro.senha}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit" className="btn-primary">Salvar Alterações</Button>
                <Link to="/gerenciar-barbeiros" className="btn-secondary">Cancelar</Link>
            </Form>
        </Container>
    );
}

export default EditarBarbeiro;
