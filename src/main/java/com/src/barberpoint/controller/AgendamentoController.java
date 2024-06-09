package com.src.barberpoint.controller;

import com.src.barberpoint.model.Agendamento;
import com.src.barberpoint.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    public List<Agendamento> getAllAgendamentos() {
        return agendamentoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> getAgendamentoById(@PathVariable Long id) {
        return agendamentoService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Agendamento> createAgendamento(@RequestBody Agendamento agendamento) {
        Agendamento savedAgendamento = agendamentoService.save(agendamento);
        return ResponseEntity.ok(savedAgendamento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agendamento> updateAgendamento(@PathVariable Long id,
            @RequestBody Agendamento agendamentoDetails) {
        return agendamentoService.findById(id).map(agendamento -> {
            agendamento.setDataHoraInicio(agendamentoDetails.getDataHoraInicio());
            agendamento.setDataHoraFim(agendamentoDetails.getDataHoraFim());
            agendamento.setDuracao(agendamentoDetails.getDuracao());
            agendamento.setServico(agendamentoDetails.getServico());
            agendamento.setCliente(agendamentoDetails.getCliente());
            agendamento.setBarbeiro(agendamentoDetails.getBarbeiro());
            Agendamento updatedAgendamento = agendamentoService.save(agendamento);
            return ResponseEntity.ok(updatedAgendamento);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgendamento(@PathVariable Long id) {
        if (agendamentoService.deleteById(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Agendamento>> getAgendamentosByClienteId(@PathVariable Long clienteId) {
        List<Agendamento> agendamentos = agendamentoService.findByClienteId(clienteId);
        return ResponseEntity.ok(agendamentos);
    }

}
