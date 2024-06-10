package com.src.barberpoint.repository;

import com.src.barberpoint.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByClienteId(Long clienteId);

    boolean existsByClienteId(Long clienteId);

    void deleteByClienteId(Long clienteId);

    boolean existsByBarbeiroId(Long barbeiroId);

    void deleteByBarbeiroId(Long barbeiroId);

}
