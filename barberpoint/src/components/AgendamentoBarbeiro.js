import React, { useState, useEffect } from 'react';

function AgendamentosBarbeiro() {
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        async function fetchAgendamentos() {
            const response = await fetch('/agendamentos');
            const data = await response.json();
            setAgendamentos(Array.isArray(data) ? data : []);
        }
        fetchAgendamentos();
    }, []);

    return (
        <div>
            {agendamentos.map(agendamento => (
                <div key={agendamento.id} className="card">
                    <h3>Barbeiro: {agendamento.barbeiro.nome} {agendamento.barbeiro.sobrenome}</h3>
                    <p>Data e Hora: {new Date(agendamento.dataHoraInicio).toLocaleString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    <p>Serviço: {agendamento.servico}</p>
                    <p>Cliente: {agendamento.cliente.nome} {agendamento.cliente.sobrenome}</p>
                    <p>Telefone: {agendamento.cliente.telefone}</p>
                </div>
            ))}
        </div>
    );
}

export default AgendamentosBarbeiro;
