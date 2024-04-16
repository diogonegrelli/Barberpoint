import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function GerenciarBarbeiros() {
    const [barbeiros, setBarbeiros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBarbeiros();
    }, []);

    const fetchBarbeiros = async () => {
        try {
            const response = await fetch('/barbeiros');
            if (!response.ok) throw new Error('Erro ao buscar barbeiros');
            const data = await response.json();
            setBarbeiros(data);
        } catch (error) {
            console.error('Falha ao buscar barbeiros:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este barbeiro?')) {
            try {
                const response = await fetch(`/barbeiros/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Erro ao deletar barbeiro');
                fetchBarbeiros(); // Atualiza a lista após a exclusão
                navigate('/gerenciar-barbeiros'); // Redireciona para a lista de barbeiros
            } catch (error) {
                console.error('Falha ao deletar barbeiro:', error);
            }
        }
    };
    
    const handleNavigateHome = () => {
        navigate('/'); // Função para navegar para a Home
    };

    return (
        <div>
            <h2>Gerenciar Barbeiros</h2>
            <button onClick={handleNavigateHome} style={{ marginBottom: '10px' }}>HOME</button>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                    </tr>
                </thead>
                <tbody>
                    {barbeiros.map((barbeiro) => (
                        <tr key={barbeiro.id}>
                            <td>{barbeiro.nome}</td>
                            <td>{barbeiro.sobrenome}</td>
                            <td>
                                <Link to={`/editar-barbeiro/${barbeiro.id}`}>Editar</Link>
                                {' | '}
                                <button onClick={() => handleDelete(barbeiro.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GerenciarBarbeiros;
