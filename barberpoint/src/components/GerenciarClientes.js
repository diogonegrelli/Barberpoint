import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GerenciarClientes() {
    const [clientes, setClientes] = useState([]);
    const [mensagem, setMensagem] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await fetch('/clientes');
            if (!response.ok) throw new Error('Erro ao buscar clientes');
            const data = await response.json();
            setClientes(data);
        } catch (error) {
            console.error('Falha ao buscar clientes:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/clientes/${id}`, { method: 'DELETE' });
            if (response.status === 409) { // Cliente tem agendamentos
                if (window.confirm('O cliente tem agendamentos marcados! Deseja excluir eles para deletar o cliente?')) {
                    const responseWithAgendamentos = await fetch(`/clientes/${id}/with-agendamentos`, {
                        method: 'DELETE',
                    });
                    if (!responseWithAgendamentos.ok) throw new Error('Erro ao deletar cliente e agendamentos');
                    setClientes(clientes.filter(cliente => cliente.id !== id));
                    setMensagem('Cliente e agendamentos deletados com sucesso.');
                    setTimeout(() => {
                        setMensagem('');
                    }, 3000);
                }
            } else if (!response.ok) {
                throw new Error('Erro ao deletar cliente');
            } else {
                setClientes(clientes.filter(cliente => cliente.id !== id));
                setMensagem('Cliente deletado com sucesso.');
                setTimeout(() => {
                    setMensagem('');
                }, 3000);
            }
        } catch (error) {
            console.error('Falha ao deletar cliente:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/editar-cliente/${id}`);
    };

    const handleNavigateHome = () => {
        navigate('/admin-home'); // Função para navegar para a Home
    };

    return (
        <div>
            <h2>Gerenciar Clientes</h2>
            {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                        <th><button onClick={handleNavigateHome}>Painel</button></th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>
                                <button onClick={() => handleEdit(cliente.id)}>Editar</button>
                                {' | '}
                                <button onClick={() => handleDelete(cliente.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GerenciarClientes;
