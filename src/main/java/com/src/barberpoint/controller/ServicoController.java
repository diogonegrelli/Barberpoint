package com.src.barberpoint.controller;

import com.src.barberpoint.model.Servico;
import com.src.barberpoint.service.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servicos")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @GetMapping
    public List<Servico> getAllServicos() {
        return servicoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servico> getServicoById(@PathVariable Long id) {
        return servicoService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Servico createServico(@RequestBody Servico servico) {
        return servicoService.save(servico);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servico> updateServico(@PathVariable Long id, @RequestBody Servico servicoDetails) {
        return servicoService.findById(id)
                .map(servico -> {
                    servico.setNomeServico(servicoDetails.getNomeServico());
                    servico.setDescricao(servicoDetails.getDescricao());
                    servico.setPreco(servicoDetails.getPreco());
                    Servico updatedServico = servicoService.save(servico);
                    return ResponseEntity.ok(updatedServico);
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteServico(@PathVariable Long id) {
        return servicoService.findById(id)
                .map(servico -> {
                    servicoService.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
