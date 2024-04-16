import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

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

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div>
            <h2>Editar Barbeiro</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="nome" value={barbeiro.nome} onChange={handleChange} required />
                </label>
                <label>
                    Sobrenome:
                    <input type="text" name="sobrenome" value={barbeiro.sobrenome} onChange={handleChange} required />
                </label>
                <label>
                    Senha: (altere para mudar)
                    <input type="password" name="senha" value={barbeiro.senha} onChange={handleChange} />
                </label>
                <button type="submit">Salvar Alterações</button>
                <Link to="/gerenciar-barbeiros">Cancelar</Link>
            </form>
        </div>
    );
}

export default EditarBarbeiro;
