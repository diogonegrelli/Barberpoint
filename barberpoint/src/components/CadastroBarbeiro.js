import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroBarbeiro.css'; // Import the updated CSS file

function CadastroBarbeiro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [servico, setServico] = useState('');
    const [duracao, setDuracao] = useState(0);

    const handleServicoChange = (event) => {
        const selectedServico = event.target.value;
        setServico(selectedServico);

        switch (selectedServico) {
            case 'Barba':
            case 'Corte':
            case 'Sobrancelha':
                setDuracao(30);
                break;
            case 'Barba e Corte':
            case 'Completo':
                setDuracao(60);
                break;
            default:
                setDuracao(0);
                break;
        }
    };    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const barbeiro = { nome, sobrenome, email, telefone, senha, servico, duracao };
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
            setDuracao("");
            setEmail("");
            setTelefone("");
            setServico("");

            // Navega para outra página se necessário ou recarrega a mesma para limpeza visual
            navigate('/cadastro-barbeiro'); 
        } catch (error) {
            console.error("Erro ao cadastrar barbeiro:", error.message);
        }
    };

    const handleNavigateHome = () => {
        navigate('/admin-home'); // Função para navegar para a Home
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastrar Barbeiro</h2>
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="tel" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            <select value={servico} onChange={handleServicoChange} required>
                <option value="">Selecione um serviço</option>
                <option value="Barba">Barba</option>
                <option value="Corte">Corte</option>
                <option value="Barba e Corte">Barba e Corte</option>
                <option value="Sobrancelha">Sobrancelha</option>
                <option value="Completo">Completo</option>
            </select>
            <button type="submit">Cadastrar</button>
            <button type="button" onClick={handleNavigateHome}>Painel</button>
        </form>
    );
}

export default CadastroBarbeiro;