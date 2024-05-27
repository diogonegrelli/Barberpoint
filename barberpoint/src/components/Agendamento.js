import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Agendamento() {
    const navigate = useNavigate();
    const [barbeiros, setBarbeiros] = useState([]);
    const [barbeiroId, setBarbeiroId] = useState('');
    const [servico, setServico] = useState('');
    const [duracao, setDuracao] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
    const [horariosOcupados, setHorariosOcupados] = useState([]);

    useEffect(() => {
        async function fetchBarbeiros() {
            const response = await fetch('/barbeiros');
            const data = await response.json();
            setBarbeiros(Array.isArray(data) ? data : []);
        }
        fetchBarbeiros();
    }, []);

    useEffect(() => {
        if (barbeiroId && selectedDate && duracao) {
            async function fetchHorariosOcupados() {
                const response = await fetch(`/agendamentos/barbeiro/${barbeiroId}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setHorariosOcupados(data.map(agendamento => ({
                        inicio: new Date(agendamento.dataHoraInicio),
                        fim: new Date(agendamento.dataHoraFim)
                    })));
                } else {
                    setHorariosOcupados([]);
                }
            }
            fetchHorariosOcupados();
        }
    }, [barbeiroId, selectedDate, duracao]);

    useEffect(() => {
        if (duracao && selectedDate) {
            const horarios = [];
            const inicioTrabalho = 9;
            const fimTrabalho = 18;
            const intervaloAlmocoInicio = 12;
            const intervaloAlmocoFim = 13;

            const dia = new Date(selectedDate);
            dia.setHours(0, 0, 0, 0);

            for (let hora = inicioTrabalho; hora < fimTrabalho; hora += (duracao === 30 ? 0.5 : 1)) {
                if (hora >= intervaloAlmocoInicio && hora < intervaloAlmocoFim) continue;

                const inicio = new Date(dia);
                inicio.setHours(hora, 0, 0, 0);
                const fim = new Date(inicio.getTime() + duracao * 60000);

                horarios.push({ inicio, fim });

                if (duracao === 30) {
                    const inicioMeiaHora = new Date(inicio.getTime() + 30 * 60000);
                    if (inicioMeiaHora.getHours() < fimTrabalho && (inicioMeiaHora.getHours() < intervaloAlmocoInicio || inicioMeiaHora.getHours() >= intervaloAlmocoFim)) {
                        horarios.push({ inicio: inicioMeiaHora, fim: new Date(inicioMeiaHora.getTime() + 30 * 60000) });
                    }
                }
            }

            setHorariosDisponiveis(horarios);
        }
    }, [duracao, selectedDate]);

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

    const handleSubmit = async (inicio) => {
        const clienteId = localStorage.getItem("clienteId");
        if (!clienteId) {
            alert('Cliente não está logado');
            return;
        }

        const fim = new Date(inicio.getTime() + duracao * 60000);
        const agendamento = {
            cliente: { id: clienteId },
            barbeiro: { id: barbeiroId },
            servico,
            duracao,
            dataHoraInicio: inicio.toISOString(),
            dataHoraFim: fim.toISOString()
        };

        const response = await fetch('/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(agendamento),
        });

        if (response.ok) {
            alert('Agendamento criado com sucesso!');
            navigate('/'); // Redireciona o usuário após o agendamento
        } else {
            const errorText = await response.text();
            alert(`Erro ao criar agendamento: ${errorText}`);
        }
    };

    const isHorarioDisponivel = (inicio) => {
        return !horariosOcupados.some(({ inicio: ocupadoInicio, fim: ocupadoFim }) =>
            (inicio >= ocupadoInicio && inicio < ocupadoFim)
        );
    };

    return (
        <div>
            <select value={barbeiroId} onChange={(e) => setBarbeiroId(e.target.value)} required>
                <option value="">Selecione um barbeiro</option>
                {barbeiros.map(barbeiro => (
                    <option key={barbeiro.id} value={barbeiro.id}>{barbeiro.nome} {barbeiro.sobrenome}</option>
                ))}
            </select>

            {barbeiroId && (
                <select value={servico} onChange={handleServicoChange} required>
                    <option value="">Selecione um serviço</option>
                    <option value="Barba">Barba</option>
                    <option value="Corte">Corte</option>
                    <option value="Barba e Corte">Barba e Corte</option>
                    <option value="Sobrancelha">Sobrancelha</option>
                    <option value="Completo">Completo</option>
                </select>
            )}

            {servico && (
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                    filterDate={date => date.getDay() !== 0}
                    placeholderText="Selecione um dia"
                />
            )}

            <div>
                {horariosDisponiveis.map(({ inicio }) => (
                    <button
                        key={inicio}
                        onClick={() => handleSubmit(inicio)}
                        disabled={!isHorarioDisponivel(inicio)}
                    >
                        {inicio.toLocaleString('pt-BR', { weekday: 'short', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Agendamento;
