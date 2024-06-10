import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GerenciarBarbeiros.css';

function GerenciarBarbeiros() {
    const [barbeiros, setBarbeiros] = useState([]);
    const [mensagem, setMensagem] = useState('');
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
        try {
            const response = await fetch(`/barbeiros/${id}`, { method: 'DELETE' });
            if (response.status === 409) { // Barbeiro tem agendamentos
                if (window.confirm('O barbeiro tem agendamentos marcados! Deseja excluir eles para deletar o barbeiro?')) {
                    const responseWithAgendamentos = await fetch(`/barbeiros/${id}/with-agendamentos`, {
                        method: 'DELETE',
                    });
                    if (!responseWithAgendamentos.ok) throw new Error('Erro ao deletar barbeiro e agendamentos');
                    setBarbeiros(barbeiros.filter(barbeiro => barbeiro.id !== id));
                    setMensagem('Barbeiro e agendamentos deletados com sucesso.');
                    setTimeout(() => {
                        setMensagem('');
                    }, 3000);
                }
            } else if (!response.ok) {
                throw new Error('Erro ao deletar barbeiro');
            } else {
                setBarbeiros(barbeiros.filter(barbeiro => barbeiro.id !== id));
                setMensagem('Barbeiro deletado com sucesso.');
                setTimeout(() => {
                    setMensagem('');
                }, 3000);
            }
        } catch (error) {
            console.error('Falha ao deletar barbeiro:', error);
        }
    };

    const handleNavigateHome = () => {
        navigate('/admin-home'); // Função para navegar para a Home
    };

    const handleEdit = (id) => {
        navigate(`/editar-barbeiro/${id}`);
    };

    return (
        <div>
            <h2>Gerenciar Barbeiros</h2>
            {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}
            
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Serviço</th>
                        <th>Ações</th>
                        <th><button onClick={handleNavigateHome}>Painel</button></th>
                    </tr>
                </thead>
                <tbody>
                    {barbeiros.map((barbeiro) => (
                        <tr key={barbeiro.id}>
                            <td>{barbeiro.nome}</td>
                            <td>{barbeiro.sobrenome}</td>
                            <td>{barbeiro.email}</td>
                            <td>{barbeiro.telefone}</td>
                            <td>{barbeiro.servico}</td>
                            <td className="actions">
                                <button onClick={() => handleEdit(barbeiro.id)}>Editar</button>
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
