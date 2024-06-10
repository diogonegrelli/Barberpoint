package com.src.barberpoint.controller;

import com.src.barberpoint.model.Barbeiro;
import com.src.barberpoint.service.AgendamentoService;
import com.src.barberpoint.service.BarbeiroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/barbeiros")
public class BarbeiroController {

    @Autowired
    private BarbeiroService barbeiroService;

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    public List<Barbeiro> getAllBarbeiros() {
        return barbeiroService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barbeiro> getBarbeiroById(@PathVariable Long id) {
        return barbeiroService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Barbeiro> createBarbeiro(@RequestBody Barbeiro barbeiro) {
        Barbeiro savedBarbeiro = barbeiroService.save(barbeiro);
        return ResponseEntity.ok(savedBarbeiro);
    }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteBarbeiro(@PathVariable Long id) {
    // if (barbeiroService.deleteById(id)) {
    // return ResponseEntity.noContent().build();
    // } else {
    // return ResponseEntity.notFound().build();
    // }
    // }

    @PutMapping("/{id}")
    public ResponseEntity<Barbeiro> updateBarbeiro(@PathVariable Long id, @RequestBody Barbeiro barbeiroDetails) {
        return barbeiroService.findById(id).map(barbeiro -> {
            barbeiro.setNome(barbeiroDetails.getNome());
            barbeiro.setSobrenome(barbeiroDetails.getSobrenome());
            barbeiro.setEmail(barbeiroDetails.getEmail());
            barbeiro.setTelefone(barbeiroDetails.getTelefone());
            barbeiro.setServico(barbeiroDetails.getServico());
            Barbeiro updatedBarbeiro = barbeiroService.save(barbeiro);
            return ResponseEntity.ok(updatedBarbeiro);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBarbeiro(@PathVariable Long id) {
        if (agendamentoService.existsByBarbeiroId(id)) {
            return ResponseEntity.status(409).build(); // Conflito - Barbeiro tem agendamentos
        }
        barbeiroService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/with-agendamentos")
    public ResponseEntity<Void> deleteBarbeiroWithAgendamentos(@PathVariable Long id) {
        agendamentoService.deleteByBarbeiroId(id);
        barbeiroService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
