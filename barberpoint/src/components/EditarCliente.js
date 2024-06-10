import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './EditarCliente.css'; // Import the updated CSS file

function EditarCliente() {
    const { idCliente } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({ nome: '', email: '', senha: '', sobrenome: '', telefone: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const response = await fetch(`/clientes/${idCliente}`);
                if (!response.ok) throw new Error('Cliente não encontrado');
                const data = await response.json();
                setCliente({ nome: data.nome, email: data.email, senha: '', sobrenome: data.sobrenome, telefone: data.telefone });
            } catch (error) {
                setError(error.message);
            }
        };
        fetchCliente();
    }, [idCliente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedCliente = { nome: cliente.nome, email: cliente.email, senha: cliente.senha, sobrenome: cliente.sobrenome, telefone: cliente.telefone };

        try {
            const response = await fetch(`/clientes/${idCliente}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCliente),
            });
            if (!response.ok) throw new Error('Falha ao atualizar cliente');
            alert("Cliente atualizado com sucesso!");
            navigate('/gerenciar-clientes');
        } catch (error) {
            setError('Erro ao salvar as alterações. Por favor, tente novamente.');
        }
    };

    return (
        <div className="container">
            <h2>Editar Cliente</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" name="nome" value={cliente.nome} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Sobrenome:</label>
                    <input type="text" name="sobrenome" value={cliente.sobrenome} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={cliente.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Telefone:</label>
                    <input type="text" name="telefone" value={cliente.telefone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Senha (deixe em branco para manter a atual):</label>
                    <input type="password" name="senha" value={cliente.senha} onChange={handleChange} />
                </div>
                <button type="submit">Salvar Alterações</button>
                <Link to="/gerenciar-barbeiros" className="btn-secondary">Cancelar</Link>
            </form>
        </div>
    );
}

export default EditarCliente;
