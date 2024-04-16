import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CadastroBarbeiro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const barbeiro = { nome, sobrenome, senha };
        try {
            const response = await fetch('/barbeiros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(barbeiro),
            });

            if (!response.ok) throw new Error('Falha ao cadastrar barbeiro');
            alert("Barbeiro cadastrado com sucesso!");

            // Limpa os campos após o cadastro bem sucedido
            setNome("");
            setSobrenome("");
            setSenha("");

            // Navega para outra página se necessário ou recarrega a mesma para limpeza visual
            navigate('/cadastro-barbeiro'); 
        } catch (error) {
            console.error("Erro ao cadastrar barbeiro:", error.message);
        }
    };

    const handleNavigateHome = () => {
        navigate('/'); // Função para navegar para a Home
    };

    return (
        <div className="container">
            <h2>Cadastro de Barbeiro</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
                <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <button type="submit">Cadastrar</button>
            </form>
            <button onClick={handleNavigateHome} style={{ marginTop: '10px' }}>HOME</button>
        </div>
    );
}

export default CadastroBarbeiro;