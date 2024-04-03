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
    public Agendamento createAgendamento(@RequestBody Agendamento agendamento) {
        return agendamentoService.save(agendamento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agendamento> updateAgendamento(@PathVariable Long id,
            @RequestBody Agendamento agendamentoDetails) {
        return agendamentoService.findById(id)
                .map(agendamento -> {
                    agendamento.setIdCliente(agendamentoDetails.getIdCliente());
                    agendamento.setIdBarbeiro(agendamentoDetails.getIdBarbeiro());
                    agendamento.setDataHora(agendamentoDetails.getDataHora());
                    agendamento.setIdServico(agendamentoDetails.getIdServico());
                    Agendamento updatedAgendamento = agendamentoService.save(agendamento);
                    return ResponseEntity.ok(updatedAgendamento);
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAgendamento(@PathVariable Long id) {
        return agendamentoService.findById(id)
                .map(agendamento -> {
                    agendamentoService.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
