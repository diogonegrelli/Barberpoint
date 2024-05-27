package com.src.barberpoint.service;

import com.src.barberpoint.model.Agendamento;
import com.src.barberpoint.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public List<Agendamento> findAll() {
        return agendamentoRepository.findAll();
    }

    public Optional<Agendamento> findById(Long id) {
        return agendamentoRepository.findById(id);
    }

    public List<Agendamento> findByBarbeiroId(Long barbeiroId) {
        return agendamentoRepository.findByBarbeiroId(barbeiroId);
    }

    public Agendamento save(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    public void deleteById(Long id) {
        agendamentoRepository.deleteById(id);
    }

    public boolean isBarbeiroAvailable(Long barbeiroId, LocalDateTime start, LocalDateTime end) {
        List<Agendamento> agendamentos = agendamentoRepository.findByBarbeiroIdAndDataHoraInicioBetween(barbeiroId,
                start, end);
        return agendamentos.isEmpty();
    }
}
