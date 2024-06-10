import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './EditarBarbeiro.css'; // Import the updated CSS file

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
            alert('Barbeiro atualizado com sucesso!');
            navigate('/gerenciar-barbeiros');
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">Erro: {error}</div>;

    return (
        <div className="container">
            <h2>Editar Barbeiro</h2>
            <form onSubmit={handleSubmit} className="editar-barbeiro-form">
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" name="nome" value={barbeiro.nome} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Sobrenome:</label>
                    <input type="text" name="sobrenome" value={barbeiro.sobrenome} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Senha: (altere para mudar)</label>
                    <input type="password" name="senha" value={barbeiro.senha} onChange={handleChange} />
                </div>
                <div className="buttons">
                    <button type="submit" className="btn-primary">Salvar Alterações</button>
                    <Link to="/gerenciar-barbeiros" className="btn-secondary">Cancelar</Link>
                </div>
            </form>
        </div>
    );
}

export default EditarBarbeiro;
