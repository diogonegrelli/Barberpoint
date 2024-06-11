import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Agendamento.css'; // Importando o arquivo CSS
import { ToastContainer, toast } from 'react-toastify';

function Agendamento() {
    const [barbeiros, setBarbeiros] = useState([]);
    const [barbeiroId, setBarbeiroId] = useState('');
    const [servico, setServico] = useState('');
    const [duracao, setDuracao] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
    const [horariosOcupados, setHorariosOcupados] = useState([]);
    const navigate = useNavigate();

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
            dia.setHours(inicioTrabalho, 0, 0, 0);

            while (dia.getHours() < fimTrabalho) {
                if (dia.getHours() >= intervaloAlmocoInicio && dia.getHours() < intervaloAlmocoFim) {
                    dia.setHours(intervaloAlmocoFim, 0, 0, 0);
                    continue;
                }

                const inicio = new Date(dia);
                const fim = new Date(inicio.getTime() + duracao * 60000);

                const estaOcupado = horariosOcupados.some(({ inicio: ocupadoInicio, fim: ocupadoFim }) =>
                    (inicio >= ocupadoInicio && inicio < ocupadoFim) ||
                    (fim > ocupadoInicio && fim <= ocupadoFim)
                );

                if (!estaOcupado) {
                    horarios.push({ inicio, fim });
                }

                dia.setTime(dia.getTime() + duracao * 60000);
            }

            setHorariosDisponiveis(horarios);
        }
    }, [duracao, selectedDate, horariosOcupados]);

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

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setHorariosDisponiveis([]); // Limpar os horários disponíveis ao mudar a data
    };

    const handleSubmit = async (inicio) => {
        const clienteId = localStorage.getItem("clienteId");
        if (!clienteId) {
            toast.error('Cliente não está logado');
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
            toast.success('Agendamento criado com sucesso!');
        } else {
            const errorText = await response.text();
            toast.error(`Erro ao criar agendamento: ${errorText}`);
        }
    };

    const isHorarioDisponivel = (inicio) => {
        const fim = new Date(inicio.getTime() + duracao * 60000); // Declaração da variável fim no escopo correto
        return !horariosOcupados.some(({ inicio: ocupadoInicio, fim: ocupadoFim }) =>
            (inicio >= ocupadoInicio && inicio < ocupadoFim) ||
            (fim > ocupadoInicio && fim <= ocupadoFim)
        );
    };

    const handleNavigateHome = () => {
        navigate('/'); // Função para navegar para a Home
      };

    const servicos = [
        { nome: 'Barba', duracao: '30 minutos', valor: 'R$ 25,00' },
        { nome: 'Corte', duracao: '30 minutos', valor: 'R$ 30,00' },
        { nome: 'Barba e Corte', duracao: '60 minutos', valor: 'R$ 50,00' },
        { nome: 'Sobrancelha', duracao: '30 minutos', valor: 'R$ 20,00' },
        { nome: 'Completo', duracao: '60 minutos', valor: 'R$ 60,00' },
    ];

    return (
        <div className="agendamento-container">
            <ToastContainer />
            <div className="agendamento-header">
                <h2>Agendar Serviço</h2>
                <button onClick={handleNavigateHome} style={{ marginBottom: '10px', marginRight: '10px' }}>Voltar</button>
            </div>
            <div className="agendamento-form">
                <label>
                    Barbeiro:
                    <select value={barbeiroId} onChange={(e) => setBarbeiroId(e.target.value)} required>
                        <option value="">Selecione um barbeiro</option>
                        {barbeiros.map(barbeiro => (
                            <option key={barbeiro.id} value={barbeiro.id}>{barbeiro.nome} {barbeiro.sobrenome}</option>
                        ))}
                    </select>
                </label>

                {barbeiroId && (
                    <label>
                        Serviço:
                        <select value={servico} onChange={handleServicoChange} required>
                            <option value="">Selecione um serviço</option>
                            {servicos.map(servico => (
                                <option key={servico.nome} value={servico.nome}>{servico.nome}</option>
                            ))}
                        </select>
                    </label>
                )}

                {servico && (
                    <label>
                        Data:
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                            filterDate={date => date.getDay() !== 0}
                            placeholderText="Selecione um dia"
                            shouldCloseOnSelect={true}
                        />
                    </label>
                )}

                <Table responsive="sm" striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Serviço</th>
                            <th>Duração</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map(servico => (
                            <tr key={servico.nome}>
                                <td>{servico.nome}</td>
                                <td>{servico.duracao}</td>
                                <td>{servico.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="horarios-container">
                    {horariosDisponiveis.map(({ inicio }) => (
                        <button
                            key={inicio}
                            className={`horario-button ${!isHorarioDisponivel(inicio) ? 'disabled' : ''}`}
                            onClick={() => handleSubmit(inicio)}
                            disabled={!isHorarioDisponivel(inicio)}
                        >
                            {inicio.toLocaleString('pt-BR', { weekday: 'short', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Agendamento;
