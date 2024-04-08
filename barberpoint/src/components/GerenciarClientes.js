import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function GerenciarClientes() {
    const [clientes, setClientes] = useState([]);

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
        if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
            try {
                const response = await fetch(`/clientes/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Erro ao deletar cliente');
                fetchClientes(); // Atualiza a lista após a exclusão
            } catch (error) {
                console.error('Falha ao deletar cliente:', error);
            }
        }
    };

    return (
        <div>
            <h2>Gerenciar Clientes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>
                                <Link to={`/editar-cliente/${cliente.id}`}>Editar</Link>
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
