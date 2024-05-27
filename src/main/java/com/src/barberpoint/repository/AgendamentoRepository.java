package com.src.barberpoint.repository;

import com.src.barberpoint.model.Agendamento;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByBarbeiroIdAndDataHoraInicioBetween(Long barbeiroId, LocalDateTime start, LocalDateTime end);

    List<Agendamento> findByBarbeiroId(Long barbeiroId);
}
