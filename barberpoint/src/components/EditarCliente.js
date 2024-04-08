import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarCliente() {
    const { idCliente } = useParams(); // Asegure-se que 'id' corresponde ao parâmetro definido nas suas rotas
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
        // Remove 'senha' do objeto se você não deseja atualizar a senha
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
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="nome" value={cliente.nome} onChange={handleChange} required />
                </label>
                <label>
                    Sobrenome:
                    <input type="text" name="sobrenome" value={cliente.sobrenome} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={cliente.email} onChange={handleChange} required />
                </label>
                <label>
                    Telefone:
                    <input type="text" name="telefone" value={cliente.telefone} onChange={handleChange} />
                </label>
                <label>
                    Senha (deixe em branco para manter a atual):
                    <input type="password" name="senha" value={cliente.senha} onChange={handleChange} />
                </label>
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default EditarCliente;
