package com.src.barberpoint.controller;

import com.src.barberpoint.model.Agendamento;
import com.src.barberpoint.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<String> createAgendamento(@RequestBody Agendamento agendamento) {
        if (agendamento.getCliente() == null || agendamento.getCliente().getId() == null) {
            return ResponseEntity.badRequest().body("Cliente não pode ser nulo.");
        }

        LocalDateTime start = agendamento.getDataHoraInicio();
        LocalDateTime end = start.plusMinutes(agendamento.getDuracao());

        try {
            if (agendamentoService.isBarbeiroAvailable(agendamento.getBarbeiro().getId(), start, end)) {
                agendamento.setDataHoraFim(end);
                agendamentoService.save(agendamento);
                return ResponseEntity.ok("Agendamento criado com sucesso.");
            } else {
                return ResponseEntity.status(409).body("Horário não disponível para o barbeiro selecionado.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao criar agendamento: " + e.getMessage());
        }
    }

    @GetMapping
    public List<Agendamento> getAllAgendamentos() {
        return agendamentoService.findAll();
    }

}
